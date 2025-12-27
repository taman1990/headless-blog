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

  // Locate current post index to enable prev/next navigation
  const postIndex = posts.findIndex((p) => p.slug === slug);

  if (postIndex === -1) {
    notFound();
  }

  const post = getPostBySlug(slug);

  // Posts are sorted newest → oldest
  // Previous = older, Next = newer
  const prevPost = posts[postIndex + 1] ?? null;
  const nextPost = posts[postIndex - 1] ?? null;

  const processed = await remark().use(html).process(post.content);
  const contentHtml = processed.toString();

  return (
    <main className="max-w-3xl mx-auto py-24 px-4">
      {/* Breadcrumbs provide orientation for deep links and SEO context */}
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
              href="/blog"
              className="hover:text-accent transition-colors"
            >
              Blog
            </Link>
          </li>

          <li>/</li>

          {/* Truncated to avoid layout breakage on small screens */}
          <li className="text-text-secondary truncate max-w-[16rem]">
            {post.title}
          </li>
        </ol>
      </nav>

      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        {post.title}
      </h1>

      {/* Tags act as secondary navigation, not metadata */}
      {post.tags && (
        <ul className="flex flex-wrap gap-2 mb-6">
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

      {/* Publication date is intentionally low-emphasis */}
      <p className="text-text-secondary text-sm">
        {post.date}
      </p>

      {/* Article content rendered from Markdown — untouched by layout logic */}
      <article
        className="prose prose-invert prose-sm max-w-none max-w-3xl mx-auto px-4 py-24"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Prev / Next navigation encourages linear reading */}
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
