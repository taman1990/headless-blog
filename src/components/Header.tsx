"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // controls mobile menu

  // Determines if a nav link is active based on current route
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Shared link styling with active state support
  const linkClass = (href: string) =>
    isActive(href)
      ? "text-accent font-semibold"
      : "text-text-secondary transition-colors hover:text-accent";

  return (
    <header className="border-b border-border bg-bg relative">
      <nav className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="font-semibold tracking-tight">
          Headless Blog
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden md:flex gap-6 text-sm">
          <li>
            <Link href="/" className={linkClass("/")}>Home</Link>
          </li>
          <li>
            <Link href="/blog" className={linkClass("/blog")}>Blog</Link>
          </li>
          <li>
            <Link href="/tags" className={linkClass("/tags")}>Tags</Link>
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-text-secondary hover:text-accent transition-colors"
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40
          transition-opacity
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      {/* Mobile side panel */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-1/2
          bg-surface border-l border-border
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col px-6 py-6 gap-6 text-sm">
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="self-end text-text-muted hover:text-accent transition-colors"
            aria-label="Close menu"
          >
            ✕
          </button>

          <Link href="/" className={linkClass("/")} onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link
            href="/blog"
            className={linkClass("/blog")}
            onClick={() => setOpen(false)}
          >
            Blog
          </Link>

          <Link
            href="/tags"
            className={linkClass("/tags")}
            onClick={() => setOpen(false)}
          >
            Tags
          </Link>

          <a
            href="/rss.xml"
            className="text-text-secondary hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            RSS
          </a>
        </div>
      </aside>
    </header>
  );
}
