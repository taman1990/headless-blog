import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";

type Props = {
  params: Promise<{
    tag: string;
  }>;
};

export default async function TagPage({ params }: Props) {
  const { tag } = await params;

  const posts = getAllPosts();

  const filteredPosts = posts.filter((post) =>
    post.tags?.includes(tag)
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-16">
<nav aria-label="Breadcrumb" className="mb-6 text-sm">
  <ol className="flex items-center gap-2 text-text-muted">
    <li>
      <Link
        href="/"
        className="hover:text-accent transition-colors"
      >
        Home
      </Link>
    </li>

    <li>/</li>

    <li>
      <Link
        href="/tags"
        className="hover:text-accent transition-colors"
      >
        Tags
      </Link>
    </li>

    <li>/</li>

    <li className="text-text-secondary">
      {tag}
    </li>
  </ol>
</nav>

        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          #{tag}
        </h1>
        <p className="text-text-secondary text-sm">
          {filteredPosts.length} post
          {filteredPosts.length > 1 ? "s" : ""}
        </p>
      </header>

      <ul className="space-y-12">
        {filteredPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block text-xl font-medium hover:text-accent transition-colors"
            >
              {post.title}
            </Link>

            <p className="text-text-secondary mt-1 max-w-xl">
              {post.description}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).map((tag) => ({
    tag,
  }));
}
