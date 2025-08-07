/**
 * 記事ページに広告を追加する実装例
 * 
 * このファイルは実装の参考例です。
 * 実際の記事ページ（app/articles/[slug]/page.tsx）で使用してください。
 */

import { InArticleAd, ResponsiveAd } from "@/components/AdComponents";

// 型定義例
interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// 使用例のコンポーネント（実際には使用されません）
export default async function ArticlePageExample({ params }: ArticlePageProps) {
  // 実際の実装では、記事データの取得処理などが入ります
  const { slug } = await params;
  
  // ダミーデータ（実際の実装では記事データを使用）
  const data = {
    title: "記事タイトル例"
  };
  const htmlContent = "<p>記事コンテンツ例</p>";

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-10 px-4">
      <div className="container mx-auto max-w-2xl bg-white/95 rounded-xl shadow-md p-6 md:p-12">
        {/* 記事上部の広告 */}
        <ResponsiveAd
          adSlot="1234567890" // 実際の広告スロットIDに置き換え
          className="mb-6"
        />

        <h1 className="font-bold text-gray-900 mb-2 leading-tight text-[18px] md:text-[22px]">
          {data.title}
        </h1>

        {/* 既存のメタ情報 */}
        {/* ... */}

        <article className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>

        {/* 記事下部の広告 */}
        <div className="mt-8 border-t pt-6">
          <InArticleAd
            adSlot="1234567891" // 実際の広告スロットIDに置き換え
          />
        </div>
      </div>
    </main>
  );
}
