import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { remark } from "remark";
import html from "remark-html";

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
  // Markdown→HTML変換
  const htmlContent = remark().use(html).processSync(content).toString();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100">
      <article className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
          {data.title}
        </h1>
        <div className="flex items-center text-xs text-gray-500 mb-6">
          <Calendar className="h-4 w-4 mr-2" />
          {data.publishedAt}
        </div>
        {data.image && (
          <div className="mb-8">
            <Image
              src={data.image}
              alt={data.title}
              width={700}
              height={400}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        )}
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
