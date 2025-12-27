import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  await page.goto("https://headless-blog-psi.vercel.app/", {
    waitUntil: "networkidle",
  });

  // Force dark mode (important for your branding)
  await page.addStyleTag({
    content: `
      html { background: #1e1e1e !important; }
    `,
  });

  await page.screenshot({
    path: "public/screenshot.png",
    fullPage: false,
  });

  await browser.close();
})();
