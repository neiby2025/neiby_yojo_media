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

interface TagPageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

// content配下すべてを再帰的に探索し、該当タグの記事を抽出
function getArticlesByTag(tag: string) {
  const root = path.join(process.cwd(), "content");
  let articles: any[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith(".md")) {
        const slug = entry.replace(/\.md$/, "");
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(fileContent);
        let type = "";
        let constitution = data.constitution || "";
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
  return articles
    .filter(
      (article) => Array.isArray(article.tags) && article.tags.includes(tag)
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

interface TagPageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  // デコードしてから検索
  const decodedTag = decodeURIComponent(tag);
  const articles = getArticlesByTag(decodedTag);

  const paginationResult = paginateItems(articles, currentPage, 12);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-8 tracking-tight">
          タグ: <span className="font-semibold">#{tag}</span> の記事
        </h1>
        {paginationResult.items.length === 0 ? (
          <p className="text-center text-gray-500">
            このタグの記事はありません。
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginationResult.items.map((article) => (
              <Card
                key={article.relPath || article.slug}
                className="overflow-hidden border border-gray-200 bg-white rounded-lg"
              >
                <Link
                  href={
                    article.type
                      ? `/constitution/${article.type}/${article.slug}`
                      : `/articles/${article.slug}`
                  }
                  className="block"
                >
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {Array.isArray(article.tags) &&
                        article.tags.map((t: string) => (
                          <Badge
                            key={t}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            #{t}
                          </Badge>
                        ))}
                    </div>
                    <CardTitle className="text-base md:text-lg leading-tight text-gray-900 font-medium">
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
            ))}
          </div>
        )}

        {paginationResult.totalPages > 1 && (
          <ArticlePagination
            currentPage={paginationResult.currentPage}
            totalPages={paginationResult.totalPages}
            basePath={`/articles/tag/${encodeURIComponent(tag)}`}
          />
        )}

        <div className="mt-12 text-center">
          <Link href="/articles/tags" className="text-blue-600 hover:underline">
            タグ一覧へ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
