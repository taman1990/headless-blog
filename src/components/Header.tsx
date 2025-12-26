import Link from "next/link";

export default function Header() {
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
            <Link href="/" className="text-secondary transition-colors hover:text-accent">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-secondary transition-colors hover:text-accent">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/tags" className="text-secondary transition-colors hover:text-accent">
              Tags
            </Link>
          </li>
          <li>
            <a
              href="/rss.xml"
              className="text-secondary transition-colors hover:text-accent"
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
