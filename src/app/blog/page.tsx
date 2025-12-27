import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Pagination from "@/components/Pagination";

const POSTS_PER_PAGE = 3;

export default function BlogPage() {
  const posts = getAllPosts();

  // Page 1 is handled by /blog.
  // Additional pages live under /blog/page/[page].
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pagePosts = posts.slice(0, POSTS_PER_PAGE);

  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      {/* Breadcrumbs provide context for deep links and improve orientation */}
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

          {/* Current page is intentionally not a link */}
          <li className="text-text-secondary">
            Blog
          </li>
        </ol>
      </nav>

      {/* Page title kept simple; pagination handles scale */}
      <h1 className="text-3xl font-semibold tracking-tight mb-16">
        Blog
      </h1>

      {/* Visual separation without heavy borders */}
      <div className="h-px bg-border mb-16" />

      {/* Post list preview for page 1 */}
      <ul className="space-y-12">
        {pagePosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block text-xl font-medium transition-colors hover:text-accent"
            >
              {post.title}
            </Link>

            <p className="text-text-muted mt-1 max-w-lg text-sm leading-relaxed">
              {post.description}
            </p>
          </li>
        ))}
      </ul>

      {/* Pagination only appears when there's more than one page */}
      {totalPages > 1 && (
        <Pagination currentPage={1} totalPages={totalPages} />
      )}
    </main>
  );
}
