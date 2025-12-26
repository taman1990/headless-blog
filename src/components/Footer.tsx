export default function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-4">
        {/* Left */}
        <p>
          © {new Date().getFullYear()} Headless Blog Frontend
        </p>

        {/* Right */}
        <ul className="flex gap-4">
          <li>
            <a
              href="https://github.com/taman1990/headless-blog"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="/rss.xml"
              className="hover:underline transition-colors hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS
            </a>
          </li>
          <li>
            <span>MIT License</span>
          </li>
        </ul>
      </div>
    </footer>
  );
}
