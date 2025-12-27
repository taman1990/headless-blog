import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Pagination from "@/components/Pagination";

const POSTS_PER_PAGE = 3;

export default function BlogPage() {
  const posts = getAllPosts();

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pagePosts = posts.slice(0, POSTS_PER_PAGE); // page 1 only

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
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
        </ol>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight mb-16">
        Blog
      </h1>

      <div className="h-px bg-border mb-16" />

      <ul className="space-y-12">
        {pagePosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block text-xl font-medium hover:text-accent transition-colors"
            >
              {post.title}
            </Link>

            <p className="text-text-muted mt-1 max-w-lg text-sm leading-relaxed">
              {post.description}
            </p>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination currentPage={1} totalPages={totalPages} />
      )}
    </main>
  );
}
