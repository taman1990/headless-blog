import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="font-semibold text-lg">
          Headless Blog
        </Link>

        {/* Navigation */}
        <ul className="flex gap-6 text-sm">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/tags" className="hover:underline">
              Tags
            </Link>
          </li>
          <li>
            <a
              href="/rss.xml"
              className="hover:underline"
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
