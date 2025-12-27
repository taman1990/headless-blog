import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllPosts,
  getPostMetaBySlug,
} from "@/lib/posts";
import { remark } from "remark";
import html from "remark-html";
import type { Metadata } from "next";

export const dynamicParams = false;

/* ---------------- Static params ---------------- */

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/* ---------------- Metadata ---------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMetaBySlug(slug);

  return {
    title: meta.title,
    description: meta.description,
  };
}

/* ---------------- Page ---------------- */

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const posts = getAllPosts();
  const postIndex = posts.findIndex((p) => p.slug === slug);

  if (postIndex === -1) {
    notFound();
  }

  const post = getPostBySlug(slug);

  // Posts are sorted newest → oldest
  const prevPost = posts[postIndex + 1] ?? null; // older
  const nextPost = posts[postIndex - 1] ?? null; // newer

  const processed = await remark().use(html).process(post.content);
  const contentHtml = processed.toString();

  return (
    <main className="max-w-3xl mx-auto py-16">
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
              href="/blog"
              className="hover:text-accent transition-colors"
            >
              Blog
            </Link>
          </li>

          <li>/</li>

          <li className="text-text-secondary truncate max-w-[16rem]">
            {post.title}
          </li>
        </ol>
      </nav>
      
      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        {post.title}
      </h1>

      {post.tags && (
        <ul className="flex gap-2 mb-6">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/tags/${tag}`}
                className="
                  inline-flex items-center
                  text-xs font-medium
                  px-2 py-0.5
                  border border-border
                  text-text-muted
                  transition-colors
                  hover:text-accent
                  hover:border-accent
                "
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Date (fixed typo) */}
      <p className="text-text-secondary text-sm">
        {post.date}
      </p>

      {/* Content — kept exactly */}
      <article
        className="max-w-3xl mx-auto px-4 py-24"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Prev / Next navigation */}
      <nav className="mt-24 flex justify-between gap-8 text-sm">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="text-text-secondary hover:text-accent transition-colors"
          >
            ← {prevPost.title}
          </Link>
        ) : (
          <span />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="text-text-secondary hover:text-accent transition-colors text-right"
          >
            {nextPost.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
