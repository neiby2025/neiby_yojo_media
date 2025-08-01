import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

export default function OwnerBlogList() {
  const dirPath = path.join(process.cwd(), "content", "owner-blog");
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));
  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(dirPath, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      const category =
        typeof data.category === "string" && data.category
          ? data.category
          : "コラム";
      return {
        slug,
        title: String(data.title ?? slug),
        date:
          data.date instanceof Date
            ? data.date.toISOString().slice(0, 10)
            : String(data.date ?? ""),
        category,
        image: typeof data.image === "string" ? data.image : undefined,
      };
    })
    .filter(
      (post) => post.category === "お知らせ" || post.category === "コラム"
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const news = posts.filter((p) => p.category === "お知らせ");
  const columns = posts.filter((p) => p.category === "コラム");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          運営者ブログ
        </h1>
        <p className="text-gray-700 mb-10 text-center">
          Neiby運営の想いや裏話、日々の気づきなどを綴っています。
        </p>

        <h2 className="text-lg font-bold text-blue-700 mb-4 mt-8">お知らせ</h2>
        <ul className="space-y-6 mb-12">
          {news.length === 0 && (
            <li className="text-gray-400">お知らせはありません</li>
          )}
          {news.map((post) => (
            <li
              key={post.slug}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-4 items-center"
            >
              {post.image && (
                <div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={120}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/owner-blog/${post.slug}`}
                  className="font-semibold text-blue-700 hover:underline text-lg block truncate"
                >
                  {post.title}
                </Link>
                <div className="text-xs text-gray-500 mt-1 flex gap-2">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-bold text-green-700 mb-4 mt-8">コラム</h2>
        <ul className="space-y-6">
          {columns.length === 0 && (
            <li className="text-gray-400">コラムはありません</li>
          )}
          {columns.map((post) => (
            <li
              key={post.slug}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-4 items-center"
            >
              {post.image && (
                <div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={120}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/owner-blog/${post.slug}`}
                  className="font-semibold text-blue-700 hover:underline text-lg block truncate"
                >
                  {post.title}
                </Link>
                <div className="text-xs text-gray-500 mt-1 flex gap-2">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
