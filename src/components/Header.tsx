"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    isActive(href)
      ? "text-accent"
      : "text-text-secondary transition-colors hover:text-accent";

  return (
    <header className="border-b border-border bg-bg">
      <nav className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="font-semibold tracking-tight">
          Headless Blog
        </Link>

        {/* Navigation */}
        <ul className="flex gap-6 text-sm">
          <li>
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className={linkClass("/blog")}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/tags" className={linkClass("/tags")}>
              Tags
            </Link>
          </li>
          <li>
            <a
              href="/rss.xml"
              className="text-text-secondary transition-colors hover:text-accent"
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
