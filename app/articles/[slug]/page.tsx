import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { remark } from "remark";
import html from "remark-html";
import { InArticleAd, ResponsiveAd } from "@/components/AdComponents";
import { SafeHtml } from "@/components/SafeHtml";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// content配下を再帰的に探索してslug一致のmdファイルを探す（owner-blogを除外）
function findArticleFile(slug: string, dir: string): string | null {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // owner-blogディレクトリは除外
      if (entry.name === "owner-blog") continue;
      const found = findArticleFile(slug, fullPath);
      if (found) return found;
    } else if (entry.isFile() && entry.name === `${slug}.md`) {
      return fullPath;
    }
  }
  return null;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const contentRoot = path.join(process.cwd(), "content");
  const filePath = findArticleFile(slug, contentRoot);
  if (!filePath) return notFound();
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const processed = await remark().use(html).process(content);
  const htmlContent = processed.toString();

  // 日付フォーマット
  let dateStr = "";
  if (data.publishedAt) {
    let iso = "";
    if (typeof data.publishedAt === "string") {
      const d = new Date(data.publishedAt);
      iso = !isNaN(d.getTime())
        ? d.toISOString().slice(0, 10)
        : data.publishedAt;
    } else {
      iso = String(data.publishedAt);
    }
    dateStr = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : iso;
  }
  dateStr = String(dateStr);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-10 px-4">
      <div className="container mx-auto max-w-2xl bg-white/95 rounded-xl shadow-md p-6 md:p-12">
        {/* 記事上部の広告 */}
        <ResponsiveAd adSlot="1234567890" className="mb-6" />

        <h1 className="font-bold text-gray-900 mb-2 leading-tight text-[18px] md:text-[22px]">
          {data.title}
        </h1>
        {/* カテゴリ・体質・タグ */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          {data.category && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
              {data.category}
            </span>
          )}
          {data.constitution && (
            <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded font-medium">
              {data.constitution}
            </span>
          )}
          {Array.isArray(data.tags) &&
            data.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
        </div>
        <div className="text-xs text-gray-500 mb-6">{dateStr}</div>
        {data.image && (
          <div className="mb-6 rounded-lg overflow-hidden aspect-video bg-gray-100">
            <Image
              src={data.image}
              alt={data.title}
              width={800}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        <article
          className="prose max-w-none text-gray-900 leading-relaxed tracking-wide prose-headings:font-bold prose-headings:text-gray-800 prose-h1:mb-6 prose-h2:mb-4 prose-h3:mb-2 prose-p:mb-4 prose-img:rounded-lg prose-img:shadow-sm prose-img:my-6 prose-blockquote:border-l-4 prose-blockquote:border-blue-200 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-md prose-li:mb-2 prose-li:marker:text-blue-400 prose-a:text-blue-700 prose-a:underline hover:prose-a:text-blue-900 prose-strong:text-gray-900 prose-table:rounded-lg prose-table:overflow-hidden prose-table:bg-gray-50 prose-th:bg-gray-100 prose-th:p-2 prose-td:p-2 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded text-sm md:text-base"
          style={{ wordBreak: "break-word" }}
        >
          <SafeHtml htmlContent={htmlContent} />
        </article>

        {/* 記事下部の広告 */}
        <div className="mt-8 border-t pt-6">
          <InArticleAd adSlot="1234567891" />
        </div>
      </div>
    </main>
  );
}
