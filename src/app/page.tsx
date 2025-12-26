import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  
  const posts = getAllPosts().slice(0, 3); // latest 3 posts

  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      {/* Intro */}
      <section className="mb-20">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          A modern gaming blog,<br />
          built like a developer tool.
        </h1>

        <p className="text-text-secondary max-w-xl text-lg">
          A dark, fast, and minimal blog template inspired by VS Code.
          Built with Next.js, Markdown, and Tailwind.
        </p>
      </section>

      <div className="h-px bg-border mb-16" />

      {/* Latest posts */}
      <section>
      <h2 className="text-sm uppercase tracking-widest text-text-muted mb-8">
        Latest Posts
      </h2>

      <ul className="space-y-10">
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
        <div className="mt-16">
          <Link
            href="/blog"
            className="text-sm text-secondary transition-colors link-hover"
          >
            View all posts →
          </Link>
        </div>
      </section>
    </main>
  );
}
