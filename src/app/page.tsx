import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  // Homepage intentionally shows only a preview of content.
  // Full listing lives on /blog to keep the landing page focused.
  const posts = getAllPosts().slice(0, 3);

  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      {/* Intro
          Sets tone and hierarchy.
          Kept short to avoid pushing content below the fold on mobile */}
      <section className="mb-24">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-5">
          A modern gaming blog designed for clarity and speed.<br />
        </h1>

        <p className="text-text-secondary max-w-lg text-base leading-relaxed">
          Built with Next.js, Markdown, and Tailwind.
        </p>
      </section>

      {/* Visual separator using space + subtle rule instead of heavy borders */}
      <div className="h-px bg-border mb-16" />

      {/* Latest posts preview */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-text-muted mb-10">
          Latest Posts
        </h2>

        <ul className="space-y-12">
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

        {/* Exit link placed far enough down to avoid accidental clicks */}
        <div className="mt-24">
          <Link
            href="/blog"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            View all posts →
          </Link>
        </div>
      </section>
    </main>
  );
}
