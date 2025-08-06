import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paginateItems } from "@/lib/pagination";
import { ArticlePagination } from "@/components/ArticlePagination";

interface ConstitutionTypePageProps {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ page?: string }>;
}

interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  image: string;
  date: string;
  readingTime?: number;
  category?: string;
}

const typeInfo: Record<
  string,
  { name: string; description: string; color: string }
> = {
  "qi-deficiency": {
    name: "気虚",
    description: "気（生命エネルギー）が不足している状態",
    color: "bg-stone-50 text-stone-800 border-stone-200",
  },
  "blood-deficiency": {
    name: "血虚",
    description: "血（栄養物質）が不足している状態",
    color: "bg-zinc-50 text-zinc-800 border-zinc-200",
  },
  "qi-stagnation": {
    name: "気滞",
    description: "気の流れが滞っている状態",
    color: "bg-slate-50 text-slate-800 border-slate-200",
  },
  "blood-stasis": {
    name: "瘀血",
    description: "血の巡りが滞っている状態",
    color: "bg-gray-50 text-gray-800 border-gray-200",
  },
  "water-retention": {
    name: "水滞",
    description: "水分代謝が滞っている状態",
    color: "bg-neutral-50 text-neutral-800 border-neutral-200",
  },
};

export default async function ConstitutionTypePage({
  params,
  searchParams,
}: ConstitutionTypePageProps) {
  const { type } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const dirPath = path.join(process.cwd(), "content", "constitution", type);
  let articles: ArticleMeta[] = [];
  let typeName = "";
  let typeDescription = "";
  let typeColor = "";

  if (typeInfo[type]) {
    typeName = typeInfo[type].name;
    typeDescription = typeInfo[type].description;
    typeColor = typeInfo[type].color;
  }

  // 記事一覧を取得
  try {
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));
    articles = files
      .map((filename) => {
        const slug = filename.replace(/\.md$/, "");
        const filePath = path.join(dirPath, filename);
        const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
        return {
          slug,
          title: data.title || slug,
          excerpt: data.description || content.slice(0, 80) + "...",
          tags: data.tags || [],
          image: data.image || "/placeholder.svg?height=200&width=300",
          date: data.publishedAt || "",
          readingTime: data.readingTime || null,
          category: data.category || "",
        };
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (e) {
    articles = [];
  }

  const paginationResult = paginateItems(articles, currentPage, 12);

  if (!typeName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">
            ページが見つかりません
          </h1>
          <Link href="/">
            <span className="text-blue-700 underline">ホームに戻る</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
              {typeName}体質の記事一覧
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {typeDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginationResult.totalItems === 0 && (
              <div className="col-span-full text-center text-gray-500">
                記事がありません
              </div>
            )}
            {paginationResult.items.map((article) => (
              <Card
                key={article.slug}
                className="group overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 bg-white rounded-lg"
              >
                <Link
                  href={`/constitution/${type}/${article.slug}`}
                  className="block"
                >
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.category && (
                        <Badge className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {article.category}
                        </Badge>
                      )}
                      {Array.isArray(article.tags) &&
                        article.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
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
                      {article.readingTime && (
                        <span className="ml-4">
                          {article.readingTime}分で読める
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <ArticlePagination
            currentPage={paginationResult.currentPage}
            totalPages={paginationResult.totalPages}
            basePath={`/constitution/${type}`}
          />
        </div>
      </section>
    </div>
  );
}
