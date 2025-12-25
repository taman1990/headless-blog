import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">Tags</h1>

      <ul className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/tags/${tag}`}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
