import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  await page.goto("https://headless-blog-psi.vercel.app/", {
    waitUntil: "networkidle",
  });

  await page.screenshot({
    path: "public/screenshot.png",
    fullPage: false,
  });

  await browser.close();
})();
