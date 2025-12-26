import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  
  const posts = getAllPosts().slice(0, 3); // latest 3 posts

  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      {/* Intro */}
      <section className="mb-24">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-5">
          A modern gaming blog,<br />
          built like a developer tool.
        </h1>

        <p className="text-text-secondary max-w-lg text-base leading-relaxed">
          A dark, fast, and minimal blog template inspired by VS Code.
          Built with Next.js, Markdown, and Tailwind.
        </p>
      </section>

      <div className="h-px bg-border mb-16" />

      {/* Latest posts */}
      <section>
      <h2 className="text-xs uppercase tracking-widest text-text-muted mb-10">
        Latest Posts
      </h2>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block text-xl font-medium transition-colors hover:text-accent"
            >
              {post.title}
            </Link>

            <p className="text-text-muted max-w-lg text-sm leading-relaxed">
              {post.description}
            </p>
          </li>
        ))}
      </ul>


        <ul className="space-y-10">

        </ul>
        <div className="mt-24">
          <Link
            href="/blog"
            className="text-sm text-text-secondary hover:text-accent hover:underline transition-colors"
          >
            View all posts →
          </Link>
        </div>
      </section>
    </main>
  );
}
