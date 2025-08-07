// 実装例：記事ページに広告を追加
// app/articles/[slug]/page.tsx

import { InArticleAd, ResponsiveAd } from "@/components/AdComponents";

export default async function ArticlePage({ params }: ArticlePageProps) {
  // ... 既存のコード ...

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

        <article className="prose max-w-none...">
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
