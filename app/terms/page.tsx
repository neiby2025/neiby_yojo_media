import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-10 tracking-tight">
          利用規約
        </h1>

        <div className="bg-white rounded-lg shadow p-8 mb-8 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold mt-6 mb-2">第1条（適用）</h2>
          <p>
            本規約は、Neiby（以下「当サイト」）が提供するコンテンツおよびサービス（以下「本サービス」）の利用に関する条件を定めるものであり、すべての利用者に適用されます。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">第2条（禁止事項）</h2>
          <p>利用者は、以下の行為を行ってはなりません：</p>
          <ul className="list-disc pl-5 mt-2">
            <li>法令または公序良俗に違反する行為</li>
            <li>第三者または当サイトの権利・利益を侵害する行為</li>
            <li>当サイトの運営を妨害する行為</li>
            <li>虚偽の情報の提供</li>
            <li>その他、当サイトが不適切と判断する行為</li>
          </ul>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            第3条（知的財産権）
          </h2>
          <p>
            当サイトに掲載されている文章、画像、動画、その他のコンテンツの著作権は、当サイトまたは正当な権利を有する第三者に帰属します。利用者は、無断でこれらのコンテンツを転載、複製、配布することを禁止します。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            第4条（Amazonアソシエイト・プログラムに関する表示）
          </h2>
          <p>
            当サイトは、Amazonアソシエイト・プログラムに参加しており、適格販売により収入を得ています。アフィリエイトリンクを通じて商品を紹介する場合があります。
            これらのリンクを経由して商品を購入された場合、当サイトが報酬を得ることがあります。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">第5条（免責事項）</h2>
          <p>
            当サイトは、提供する情報について正確性や信頼性の確保に努めておりますが、内容の正確性・完全性を保証するものではありません。
            <br />
            利用者が当サイトの情報を基に行った判断・行為により生じた損害について、当サイトは一切の責任を負いません。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            第6条（広告に関する情報）
          </h2>
          <p>
            当サイトでは、第三者配信の広告サービス（Amazonアソシエイトを含む）を使用しています。これらの広告事業者は、ユーザーの興味・閲覧履歴に基づいて広告を表示するため、Cookie等の技術を使用することがあります。
            <br />
            Cookieの使用はユーザーのブラウザ設定により無効化することができます。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            第7条（規約の変更）
          </h2>
          <p>
            本規約は、必要に応じて予告なく変更されることがあります。最新の利用規約は常に本ページに掲載されるものとし、変更後も当サイトの利用を継続された場合は、変更に同意したものとみなされます。
          </p>
        </div>

        <div className="text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            トップページへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
