import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { remark } from "remark";
import html from "remark-html";
import { SafeHtml } from "@/components/SafeHtml";

export default async function SeasonalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(
    process.cwd(),
    "content",
    "seasonal",
    `${slug}.md`
  );
  if (!fs.existsSync(filePath)) return notFound();
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Markdownを適切に処理
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-10 px-4">
      <div className="container mx-auto max-w-2xl bg-white/95 rounded-xl shadow-md p-6 md:p-12">
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
        <div className="flex items-center text-xs text-gray-500 mb-6">
          <Calendar className="h-4 w-4 mr-2" />
          {data.publishedAt}
        </div>
        {data.image && (
          <div className="mb-6 rounded-lg overflow-hidden aspect-[4/3] bg-gray-100">
            <Image
              src={data.image}
              alt={data.title}
              width={800}
              height={600}
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
      </div>
    </main>
  );
}
