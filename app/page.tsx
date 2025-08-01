import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Heart,
  Leaf,
  Instagram,
  MessageCircle,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// typeをfrontmatterまたはファイル名から推測する関数
function guessTypeFromFrontmatterOrSlug(data: any, slug: string): string {
  if (data.constitution) {
    // constitutionフィールドがあればそれを使う
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
  // slugから推測
  if (slug.startsWith("qi-deficiency")) return "qi-deficiency";
  if (slug.startsWith("blood-deficiency")) return "blood-deficiency";
  if (slug.startsWith("qi-stagnation")) return "qi-stagnation";
  if (slug.startsWith("blood-stasis")) return "blood-stasis";
  if (slug.startsWith("water-retention")) return "water-retention";
  return "other";
}

export default function HomePage() {
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

  // 記事データを生成
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
        image: data.image || "/placeholder.svg?height=200&width=300",
        date: data.publishedAt || "",
        fullPath: filePath,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // 新しい順

  // 最新3件のみ抽出
  const latestArticles = articles.slice(0, 3);

  const bodyTypes = [
    {
      name: "気虚",
      description: "エネルギー不足",
      color: "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100",
    },
    {
      name: "血虚",
      description: "血の不足",
      color: "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100",
    },
    {
      name: "瘀血",
      description: "血の滞り",
      color: "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100",
    },
    {
      name: "気滞",
      description: "気の滞り",
      color: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
    },
    {
      name: "水滞",
      description: "水の滞り",
      color:
        "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-12 md:p-16 shadow-sm border border-gray-100">
            <h1 className="text-xl md:text-lg font-light text-gray-900 mb-6 leading-tight tracking-tight">
              毎日をがんばるあなたへ
              <br />
              <span className="font-medium text-gray-800">
                “私にちょうどいい”ケアを見つけませんか？
              </span>
            </h1>
            <p className="text-base md:text-s text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              東洋医学の体質診断で、あなたに合った養生法がわかります。
              <br />
              日々の選択肢を少し変えるだけで、本来の健やかさが自然と引き出されていきます。
              <br />
              一緒にその方法を学んでみませんか？
            </p>

            <Link href="/questionnaire">
              <Button
                size="lg"
                className="bg-[#1a357b] hover:bg-[#2a4a8b] text-white px-6 py-3 text-base font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Heart className="mr-2 h-5 w-5" />
                体質チェックを始める
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl font-light text-gray-900 text-center mb-12 tracking-tight">
            最新記事
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => {
              // content配下のカテゴリ名を抽出
              const match = article.fullPath.match(/content\/(\w+)\//);
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
                  key={article.fullPath}
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
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md px-2 py-1 text-xs font-medium"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-base leading-tight text-gray-900 group-hover:text-gray-700 transition-colors font-medium">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        {article.date}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Links Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <span className="block w-0 h-0 py-12 m-0" id="categories" />
          <h2 className="text-lg md:text-xl font-light text-gray-900 text-center mb-8 tracking-tight">
            カテゴリから探す
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {/* カテゴリ一覧リンク */}
            {require("../app/articles/categories").categories.map(
              (cat: any) => (
                <Link
                  key={cat.slug}
                  href={`/articles/category/${cat.slug}`}
                  className="inline-block bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-full px-5 py-2 text-sm font-medium transition-colors"
                >
                  {cat.name}
                </Link>
              )
            )}
          </div>
          {/* タグ一覧ページへの独立ボタン */}
          <div className="flex justify-center mt-6">
            <Link
              href="/articles/tags"
              className="inline-block bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-full px-6 py-2 text-base font-medium transition-colors shadow-sm"
            >
              タグ一覧
            </Link>
          </div>
        </div>
      </section>

      {/* Body Types Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-xl md:text-2xl font-light text-gray-900 text-center mb-12 tracking-tight">
            体質別で探す
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {bodyTypes.map((type) => {
              const typeSlug =
                type.name === "気虚"
                  ? "qi-deficiency"
                  : type.name === "血虚"
                  ? "blood-deficiency"
                  : type.name === "気滞"
                  ? "qi-stagnation"
                  : type.name === "瘀血"
                  ? "blood-stasis"
                  : "water-retention";
              return (
                <Link key={type.name} href={`/constitution/${typeSlug}/`}>
                  <Button
                    variant="outline"
                    className={`${type.color} border h-auto p-6 rounded-md hover:shadow-sm transition-all duration-200 w-full`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-medium mb-1">
                        {type.name}
                      </div>
                      <div className="text-xs opacity-70">
                        {type.description}
                      </div>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-100 via-indigo-100 to-slate-100">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-6 tracking-tight">
            もっと養生のことを学びませんか？
          </h2>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            最新の東洋医学の知識やセルフケア情報を
            <br />
            LINEでお届けします
          </p>
          <a
            href="https://page.line.me/174fmxur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#1a357b] hover:bg-[#2a4a8b] text-white px-8 py-4 text-lg font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-200"
            style={{ textDecoration: "none" }}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            LINEで友達追加
          </a>
        </div>
      </section>
    </div>
  );
}
