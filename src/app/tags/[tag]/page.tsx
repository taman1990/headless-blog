import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default function TagPage({
  params,
}: {
  params: { tag: string };
}) {
  const posts = getPostsByTag(params.tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">
        Tag: {params.tag}
      </h1>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-semibold hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-500">{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
