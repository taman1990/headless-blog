import fs from "fs";
import path from "path";
import matter from "gray-matter";

/* =========================
   Types (TOP of the file)
   ========================= */

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

export type Post = PostMeta & {
  content: string;
};

/* =========================
   Logic
   ========================= */

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      slug,
      ...(data as Omit<PostMeta, "slug">),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...(data as Omit<PostMeta, "slug">),
  };
}

export function getPostMetaBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data } = matter(fileContents);

  return {
    title: data.title as string,
    description: data.description as string,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();

  const tags = posts.flatMap((post) => post.tags ?? []);

  return Array.from(new Set(tags)).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  const posts = getAllPosts();

  return posts.filter((post) => post.tags?.includes(tag));
}
