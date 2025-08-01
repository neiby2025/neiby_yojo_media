import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
// JSXを使わずHTML文字列で描画するためLink, Imageは不要
import { remark } from "remark";
import html from "remark-html";

export default async function OwnerBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<any> {
  const { slug } = await params;
  const dirPath = path.join(process.cwd(), "content", "owner-blog");
  const filePath = path.join(dirPath, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: rawData, content } = matter(fileContent);
  const data = JSON.parse(JSON.stringify(rawData));
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  const title = String(data.title ?? "");
  const category = String(data.category ?? "");
  let dateStr = "";
  if (data.date) {
    let iso = "";
    if (typeof data.date === "string") {
      const d = new Date(data.date);
      iso = !isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : data.date;
    } else {
      iso = String(data.date);
    }
    dateStr = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : iso;
  }
  dateStr = String(dateStr);
  const image = String(data.image ?? "");

  // HTML組み立て
  const htmlString = `
    <main class=\"min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-10 px-4\">
      <div class=\"container mx-auto max-w-2xl bg-white/95 rounded-xl shadow-md p-6 md:p-12\">
        <div class=\"mb-6\">
          <a href=\"/owner-blog\" class=\"text-blue-700 underline text-sm\">← 運営者ブログ一覧へ</a>
        </div>
        <h1 class=\"font-bold text-gray-900 mb-2 leading-tight text-[18px] md:text-[22px]\">${title}</h1>
        ${
          category
            ? `<div class=\"flex flex-wrap gap-2 mb-4 text-xs\"><span class=\"bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium\">${category}</span></div>`
            : ""
        }
        <div class=\"text-xs text-gray-500 mb-6\">${dateStr}</div>
        ${
          image
            ? `<div class=\"mb-6 rounded-lg overflow-hidden aspect-video bg-gray-100\"><img src=\"${image}\" alt=\"${title}\" width=\"800\" height=\"400\" class=\"w-full h-auto object-cover\" /></div>`
            : ""
        }
        <article
          class=\"prose max-w-none text-gray-900 leading-relaxed tracking-wide prose-headings:font-bold prose-headings:text-gray-800 prose-h1:mb-6 prose-h2:mb-4 prose-h3:mb-2 prose-p:mb-4 prose-img:rounded-lg prose-img:shadow-sm prose-img:my-6 prose-blockquote:border-l-4 prose-blockquote:border-blue-200 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-md prose-li:mb-2 prose-li:marker:text-blue-400 prose-a:text-blue-700 prose-a:underline hover:prose-a:text-blue-900 prose-strong:text-gray-900 prose-table:rounded-lg prose-table:overflow-hidden prose-table:bg-gray-50 prose-th:bg-gray-100 prose-th:p-2 prose-td:p-2 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded\"
          style=\"word-break: break-word; font-size: 14px;\"
        >
          ${String(contentHtml)}
        </article>
      </div>
    </main>
  `;

  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
