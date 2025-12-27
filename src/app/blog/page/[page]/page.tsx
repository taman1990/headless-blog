import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import Pagination from "@/components/Pagination";

const POSTS_PER_PAGE = 3;

type Props = {
  params: Promise<{ page: string }>;
};

export default async function BlogPagePaginated({ params }: Props) {
  const { page } = await params;
  const currentPage = Number(page);

  // Page number must be a valid integer >= 2.
  // Page 1 is intentionally handled by /blog.
  if (!Number.isInteger(currentPage) || currentPage < 2) {
    notFound();
  }

  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Prevent access to pages beyond available content
  if (currentPage > totalPages) {
    notFound();
  }

  // Calculate slice range based on page number
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      {/* Breadcrumbs keep pagination pages from feeling detached */}
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

          {/* Current page indicator */}
          <li className="text-text-secondary">
            Page {currentPage}
          </li>
        </ol>
      </nav>

      <header className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Blog
        </h1>

        {/* Context is important on paginated pages */}
        <p className="text-text-secondary text-sm">
          Page {currentPage} of {totalPages}
        </p>
      </header>

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

      {/* Pagination stays consistent across blog pages */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}

/* ---------------- Static generation ---------------- */

export async function generateStaticParams() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Page 1 is intentionally excluded (handled by /blog)
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}
