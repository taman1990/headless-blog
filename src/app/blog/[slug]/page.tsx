import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { remark } from "remark";
import html from "remark-html";
import type { Metadata } from "next";
import { getPostMetaBySlug } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMetaBySlug(slug);

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ REQUIRED

  if (!slug) {
    notFound();
  }

  const post = getPostBySlug(slug);

  const processed = await remark().use(html).process(post.content);
  const contentHtml = processed.toString();

  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

    {post.tags && (
      <ul className="flex gap-2 mb-6">
        {post.tags.map((tag) => (
          <li key={tag}>
            <a
              href={`/tags/${tag}`}
              className="text-sm underline"
            >
              #{tag}
            </a>
          </li>
        ))}
      </ul>
    )}

      <p className="text-gray-500 mb-8">{post.date}</p>

      <article
        className="prose prose-neutral dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}
