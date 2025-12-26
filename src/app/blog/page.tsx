import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8 font-semibold tracking-tight">Blog</h1>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-semibold hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-text-muted max-w-lg text-sm leading-relaxed">
              {post.description}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
