import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paginateItems } from "@/lib/pagination";
import { ArticlePagination } from "@/components/ArticlePagination";

interface ArticlesPageProps {
  searchParams: Promise<{ page?: string }>;
}

// content配下すべてを再帰的に探索し全記事を取得
function getAllArticles() {
  const root = path.join(process.cwd(), "content");
  let articles: any[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        // owner-blogディレクトリは除外
        if (entry === "owner-blog") continue;
        walk(fullPath);
      } else if (entry.endsWith(".md") && entry !== "README.md") {
        const slug = entry.replace(/\.md$/, "");
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(fileContent);

        // フロントマターにtitleがない場合は記事として扱わない
        if (!data.title) {
          continue;
        }

        // 記事のtypeやconstitutionはfrontmatterやパスから推測
        let type = "";
        let constitution = data.constitution || "";

        // constitution配下の場合はtypeを推測
        const relPath = path.relative(root, fullPath);
        if (relPath.startsWith("constitution/")) {
          const parts = relPath.split(path.sep);
          if (parts.length >= 2) {
            type = parts[1];
          }
        }

        articles.push({
          slug,
          type,
          title: data.title || slug,
          excerpt: data.description || content.slice(0, 80) + "...",
          tags: data.tags || [],
          constitution,
          date: data.publishedAt || "",
          image: data.image || "/placeholder.svg?height=200&width=300",
          relPath,
        });
      }
    }
  }

  walk(root);
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  const allArticles = getAllArticles();
  const paginationResult = paginateItems(allArticles, currentPage, 12);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-12 tracking-tight">
          記事一覧
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginationResult.items.map((article) => {
            const match = article.relPath.match(/^(\w+)\//);
            const category = match ? match[1] : "";
            let href = "#";

            if (category === "constitution") {
              href = `/constitution/${article.type}/${article.slug}`;
            } else if (
              ["lifestyle", "mental", "nutrition", "seasonal"].includes(
                category
              )
            ) {
              href = `/articles/${article.slug}`;
            } else {
              href = `/articles/${article.slug}`;
            }

            return (
              <Card
                key={article.slug + article.relPath}
                className="group overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 bg-white rounded-lg"
              >
                <Link href={href} className="block">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map((tag: string) => (
                        <Link
                          key={tag}
                          href={`/articles/tag/${encodeURIComponent(tag)}`}
                          className="hover:underline"
                        >
                          <Badge className="bg-gray-100 text-gray-600 px-2 py-1 rounded cursor-pointer">
                            #{tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                    <CardTitle className="text-base md:text-lg leading-tight text-gray-900 group-hover:text-gray-700 transition-colors font-medium">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-xs md:text-base mb-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-xs md:text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {article.date}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        <ArticlePagination
          currentPage={paginationResult.currentPage}
          totalPages={paginationResult.totalPages}
          basePath="/articles"
        />

        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            トップページへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
