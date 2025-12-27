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

  // Page must be a number >= 2
  if (!Number.isInteger(currentPage) || currentPage < 2) {
    notFound();
  }

  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Page must not exceed total pages
  if (currentPage > totalPages) {
    notFound();
  }

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      <header className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Blog
        </h1>
        <p className="text-text-secondary text-sm">
          Page {currentPage} of {totalPages}
        </p>
      </header>

      <ul className="space-y-12">
        {pagePosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block text-xl font-medium hover:text-accent transition-colors"
            >
              {post.title}
            </Link>

            <p className="text-text-secondary mt-1">
              {post.description}
            </p>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Page 1 is handled by /blog
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}
