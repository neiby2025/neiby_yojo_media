import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { paginateItems } from "@/lib/pagination";
import { ArticlePagination } from "@/components/ArticlePagination";

interface OwnerBlogPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function OwnerBlogList({
  searchParams,
}: OwnerBlogPageProps) {
  const { page, category } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const selectedCategory = category || "all";

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

  // カテゴリーでフィルタリング
  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const paginationResult = paginateItems(filteredPosts, currentPage, 12);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          運営者ブログ
        </h1>
        <p className="text-gray-700 mb-10 text-center">
          Neiby運営の想いや裏話、日々の気づきなどを綴っています。
        </p>

        {/* カテゴリー選択 */}
        <div className="flex justify-center gap-4 mb-8">
          <Link
            href="/owner-blog?category=all"
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            すべて
          </Link>
          <Link
            href="/owner-blog?category=お知らせ"
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === "お知らせ"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            お知らせ
          </Link>
          <Link
            href="/owner-blog?category=コラム"
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === "コラム"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            コラム
          </Link>
        </div>

        {paginationResult.items.length === 0 ? (
          <p className="text-center text-gray-400">記事がありません</p>
        ) : (
          <ul className="space-y-6">
            {paginationResult.items.map((post) => (
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
                    <span
                      className={
                        post.category === "お知らせ"
                          ? "text-blue-600"
                          : "text-green-600"
                      }
                    >
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <ArticlePagination
          currentPage={paginationResult.currentPage}
          totalPages={paginationResult.totalPages}
          basePath={`/owner-blog?category=${selectedCategory}`}
        />
      </div>
    </div>
  );
}
