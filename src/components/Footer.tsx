import ThemeDropdown from "@/components/ThemeDropdown";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div
        className="
          max-w-3xl mx-auto px-4 py-8
          text-sm text-text-muted
          flex flex-col items-center gap-4
          md:flex-row md:items-center md:justify-between
        "
      >
        {/* Copyright
           - Centered on mobile/tablet
           - Left-aligned naturally on desktop via layout */}
        <p className="text-center">
          © {new Date().getFullYear()} Headless Blog Frontend
        </p>

        {/* Footer actions
           - Centered group on mobile/tablet
           - Inline row on desktop */}
        <ul className="flex flex-wrap items-center justify-center gap-4">
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

          {/* Informational label — not interactive */}
          <li className="text-text-secondary">
            MIT License
          </li>

          {/* Theme toggle
             - Treated like an action, not a link */}
          <li>
            <ThemeDropdown />
          </li>
        </ul>
      </div>
    </footer>
  );
}
