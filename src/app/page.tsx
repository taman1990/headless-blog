import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3); // latest 3 posts

  return (
    <main className="max-w-3xl mx-auto py-20">
      {/* Intro */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Headless Blog Frontend
        </h1>
        <p className="text-gray-500">
          A minimal blog template built with Next.js, Markdown, and Tailwind CSS.
        </p>
      </section>

      {/* Latest posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Latest Posts
        </h2>

        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-xl font-medium hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-gray-500">
                {post.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href="/blog"
            className="text-sm underline"
          >
            View all posts →
          </Link>
        </div>
      </section>
    </main>
  );
}
