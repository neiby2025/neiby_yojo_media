import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function TagsPage() {
  // content配下の全mdファイルを再帰的に取得
  function getAllMarkdownFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllMarkdownFiles(filePath));
      } else if (file.endsWith(".md")) {
        results.push(filePath);
      }
    });
    return results;
  }

  const contentRoot = path.join(process.cwd(), "content");
  const allMdFiles = getAllMarkdownFiles(contentRoot);

  // タグを集計
  const tagMap: Record<string, number> = {};
  allMdFiles.forEach((filePath) => {
    const { data } = matter(fs.readFileSync(filePath, "utf-8"));
    if (Array.isArray(data.tags)) {
      data.tags.forEach((tag: string) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    }
  });
  const tags = Object.entries(tagMap).sort((a, b) => b[1] - a[1]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-8 tracking-tight">
          タグ一覧
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tags.length === 0 && (
            <span className="text-gray-500">タグがありません</span>
          )}
          {tags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/articles/tag/${encodeURIComponent(tag)}`}
              className="inline-block bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              #{tag}{" "}
              <span className="ml-1 text-xs text-gray-500">({count})</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
