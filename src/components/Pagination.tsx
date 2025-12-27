import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  return (
    <nav className="mt-20 flex gap-3 text-sm">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const href = page === 1 ? "/blog" : `/blog/page/${page}`;

        return (
          <Link
            key={page}
            href={href}
            className={
              page === currentPage
                ? "text-accent"
                : "text-text-secondary hover:text-accent transition-colors"
            }
          >
            {page}
          </Link>
        );
      })}
    </nav>
  );
}
