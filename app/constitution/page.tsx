import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { paginateItems } from "@/lib/pagination";
import { ArticlePagination } from "@/components/ArticlePagination";

interface ConstitutionPageProps {
  searchParams: Promise<{ page?: string }>;
}

interface ArticleMeta {
  slug: string;
  type: string;
  title: string;
  excerpt: string;
  tags: string[];
  image: string;
  date: string;
  readingTime?: number;
  category?: string;
}

// constitution配下を再帰的に探索し全記事を取得
function getAllConstitutionArticles(): ArticleMeta[] {
  const root = path.join(process.cwd(), "content", "constitution");
  const types = fs
    .readdirSync(root)
    .filter((d) => fs.statSync(path.join(root, d)).isDirectory());
  let articles: ArticleMeta[] = [];
  types.forEach((type) => {
    const dir = path.join(root, type);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    files.forEach((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(dir, filename);
      const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
      articles.push({
        slug,
        type,
        title: data.title || slug,
        excerpt: data.description || content.slice(0, 80) + "...",
        tags: data.tags || [],
        image: data.image || "/placeholder.svg?height=200&width=300",
        date: data.publishedAt || "",
        readingTime: data.readingTime || null,
        category: data.category || "",
      });
    });
  });
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function ConstitutionAllArticlesPage({
  searchParams,
}: ConstitutionPageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  const articles = getAllConstitutionArticles();
  const paginationResult = paginateItems(articles, currentPage, 12);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
              全体質の記事一覧
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              すべての体質カテゴリの記事をまとめて表示します。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginationResult.items.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                記事がありません
              </div>
            )}
            {paginationResult.items.map((article) => (
              <Link
                key={article.type + ":" + article.slug}
                href={`/constitution/${article.type}/${article.slug}`}
              >
                <div className="group overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 bg-white rounded-lg cursor-pointer flex flex-col h-full">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded font-medium text-xs">
                        {article.type}
                      </span>
                      {article.category && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium text-xs">
                          {article.category}
                        </span>
                      )}
                      {Array.isArray(article.tags) &&
                        article.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                    </div>
                    <div className="font-bold text-gray-900 mb-1 text-base group-hover:text-gray-700 transition-colors">
                      {article.title}
                    </div>
                    <div className="text-gray-600 text-xs mb-3 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-auto">
                      <Calendar className="h-4 w-4 mr-2" />
                      {article.date}
                      {article.readingTime && (
                        <span className="ml-4">
                          {article.readingTime}分で読める
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <ArticlePagination
            currentPage={paginationResult.currentPage}
            totalPages={paginationResult.totalPages}
            basePath="/constitution"
          />
        </div>
      </section>
    </div>
  );
}
