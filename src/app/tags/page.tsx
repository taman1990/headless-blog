import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      {/* Breadcrumbs provide orientation and match other archive pages */}
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
            Tags
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight mb-16">
        Tags
      </h1>

      {/* Tag cloud acts as navigation, not decoration */}
      <ul className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/tags/${tag}`}
              className="
                inline-flex items-center
                text-sm font-medium
                px-3 py-1.5
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
    </main>
  );
}
