import ThemeDropdown from "@/components/ThemeDropdown";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div
        className="
          max-w-3xl mx-auto px-4 py-8
          text-sm text-text-muted
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        {/* Left: simple copyright, kept minimal to avoid visual noise */}
        <p>
          © {new Date().getFullYear()} Headless Blog Frontend
        </p>

        {/* Right: secondary navigation links, low emphasis by design */}
        <ul className="flex items-center gap-4">
          <li>
            <a
              href="https://github.com/taman1990/headless-blog"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </li>

          <li>
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              RSS
            </a>
          </li>

          {/* License is informational, not a navigation target */}
          <li className="text-text-secondary">
            MIT License
          </li>
          <li>
            <ThemeDropdown />
          </li>
        </ul>
      </div>
    </footer>
  );
}
