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

  // Filter posts by tag.
  // Tags act as a secondary navigation system, not just metadata.
  const filteredPosts = posts.filter((post) =>
    post.tags?.includes(tag)
  );

  // Unknown tags should not silently render empty pages
  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      <header className="mb-16">
        {/* Breadcrumbs provide orientation and prevent tag pages
            from feeling like detached filters */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm overflow-hidden">
          <ol className="flex items-center gap-2 text-text-muted whitespace-nowrap">
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

            {/* Tag name truncated to avoid mobile layout breakage */}
            <li className="text-text-secondary truncate max-w-[16rem]">
              {tag}
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          #{tag}
        </h1>

        {/* Post count provides context and confirms filter results */}
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
              className="block text-xl font-medium transition-colors hover:text-accent"
            >
              {post.title}
            </Link>

            <p className="text-text-muted mt-1 max-w-xl text-sm leading-relaxed">
              {post.description}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

/* ---------------- Static generation ---------------- */

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();

  // Collect unique tags across all posts
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });

  // Generate a static page for each tag
  return Array.from(tags).map((tag) => ({
    tag,
  }));
}
