import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const blogUrl = `${siteUrl}/blog`;
  const feedUrl = `${siteUrl}/rss.xml`;

  const rssItems = posts
    .map((post) => {
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${blogUrl}/${post.slug}</link>
          <guid>${blogUrl}/${post.slug}</guid>
          <description><![CDATA[${post.description}]]></description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
      `;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Headless Blog</title>
    <link>${siteUrl}</link>
    <description>Minimal Next.js headless blog</description>
    <language>en</language>

    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />

    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
