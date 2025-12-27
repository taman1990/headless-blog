"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  // Determines whether a nav link should be highlighted as active.
  // Special-cases "/" so Home doesn't appear active on every route.
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Centralized link styling so active/hover logic stays consistent.
  const linkClass = (href: string) =>
    isActive(href)
      ? "text-accent"
      : "text-text-secondary transition-colors hover:text-accent";

  return (
    <header className="border-b border-border bg-navbar">
      <nav
        className="
          max-w-3xl mx-auto px-4 py-4
          flex flex-col gap-3
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        {/* Brand: kept simple and left-aligned for fast recognition */}
        <Link
          href="/"
          className="font-semibold tracking-tight"
        >
          Headless Blog
        </Link>

        {/* Navigation
            - Wraps on mobile instead of overflowing
            - Larger tap targets via py-2
            - Horizontal layout restored on larger screens */}
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <Link href="/" className={`py-2 ${linkClass("/")}`}>
              Home
            </Link>
          </li>

          <li>
            <Link href="/blog" className={`py-2 ${linkClass("/blog")}`}>
              Blog
            </Link>
          </li>

          <li>
            <Link href="/tags" className={`py-2 ${linkClass("/tags")}`}>
              Tags
            </Link>
          </li>

          <li>
            {/* External link stays a plain <a> to avoid unnecessary client routing */}
            <a
              href="/rss.xml"
              className="py-2 text-text-secondary transition-colors hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
