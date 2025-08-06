import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { categories } from "../../categories";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paginateItems } from "@/lib/pagination";
import { ArticlePagination } from "@/components/ArticlePagination";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

function guessTypeFromFrontmatterOrSlug(data: any, slug: string): string {
  if (data.constitution) {
    switch (data.constitution) {
      case "気虚":
        return "qi-deficiency";
      case "血虚":
        return "blood-deficiency";
      case "気滞":
        return "qi-stagnation";
      case "瘀血":
        return "blood-stasis";
      case "水滞":
        return "water-retention";
      default:
        return "other";
    }
  }
  if (slug.startsWith("qi-deficiency")) return "qi-deficiency";
  if (slug.startsWith("blood-deficiency")) return "blood-deficiency";
  if (slug.startsWith("qi-stagnation")) return "qi-stagnation";
  if (slug.startsWith("blood-stasis")) return "blood-stasis";
  if (slug.startsWith("water-retention")) return "water-retention";
  return "other";
}

function getArticleUrl(category: string, slug: string, type: string): string {
  // カテゴリに応じて適切なURLパスを返す
  switch (category) {
    case "メンタル養生":
      return `/articles/mental/${slug}`;
    case "季節の養生":
      return `/articles/seasonal/${slug}`;
    case "ライフスタイル":
      return `/articles/lifestyle/${slug}`;
    case "栄養学":
      return `/articles/nutrition/${slug}`;
    case "体質改善":
      return `/constitution/${type}/${slug}`;
    default:
      // 一般的な記事の場合
      return `/articles/${slug}`;
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const categoryInfo = categories.find((c) => c.slug === category);

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

  const articles = allMdFiles
    .map((filePath) => {
      const slug = path.basename(filePath, ".md");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const type = guessTypeFromFrontmatterOrSlug(data, slug);
      return {
        slug,
        type,
        title: data.title || slug,
        excerpt: data.description || content.slice(0, 80) + "...",
        tags: data.tags || [],
        constitution: data.constitution || "",
        date: data.publishedAt || "",
        image: data.image || "/placeholder.svg?height=200&width=300",
        category: data.category || "",
      };
    })
    .filter((article) => article.category === categoryInfo?.name)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const paginationResult = paginateItems(articles, currentPage, 12);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-4 tracking-tight">
          {categoryInfo?.name}の記事一覧
        </h1>
        <p className="text-center text-gray-600 mb-12">
          {categoryInfo?.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginationResult.items.map((article) => (
            <Card
              key={article.slug}
              className="group overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 bg-white rounded-lg"
            >
              <Link
                href={getArticleUrl(
                  article.category,
                  article.slug,
                  article.type
                )}
                className="block"
              >
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
                    {article.constitution && (
                      <Badge className="bg-stone-100 text-stone-700 px-2 py-1 rounded font-medium">
                        {article.constitution}
                      </Badge>
                    )}
                    {Array.isArray(article.tags) &&
                      article.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          #{tag}
                        </Badge>
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
          ))}
        </div>

        <ArticlePagination
          currentPage={paginationResult.currentPage}
          totalPages={paginationResult.totalPages}
          basePath={`/articles/category/${category}`}
        />

        <div className="mt-12 text-center">
          <Link href="/#categories" className="text-blue-600 hover:underline">
            カテゴリ一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
