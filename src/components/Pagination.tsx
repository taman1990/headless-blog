import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  return (
    <nav
      aria-label="Pagination"
      className="mt-20 flex flex-wrap gap-2 text-sm"
    >
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        // Page 1 lives at /blog for clean, canonical URLs
        const href = page === 1 ? "/blog" : `/blog/page/${page}`;

        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={href}
            className={`
              inline-flex items-center justify-center
              min-w-[2.25rem] h-9 px-3
              border rounded-md
              transition-colors
              ${
                isActive
                  ? "border-accent text-accent"
                  : "border-border text-text-secondary hover:border-accent hover:text-accent"
              }
            `}
          >
            {page}
          </Link>
        );
      })}
    </nav>
  );
}
