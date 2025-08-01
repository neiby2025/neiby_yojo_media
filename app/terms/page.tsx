import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-10 tracking-tight">
          利用規約
        </h1>
        <div className="bg-white rounded-lg shadow p-8 mb-8 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold mb-2">第1条（適用）</h2>
          <p>
            本規約は、Neiby（以下「当サイト」）の利用に関する条件を定めるものです。
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">第2条（禁止事項）</h2>
          <p>
            法令違反、公序良俗に反する行為、当サイト運営を妨害する行為等を禁止します。
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">第3条（免責事項）</h2>
          <p>当サイトの利用により生じた損害について一切の責任を負いません。</p>
          <h2 className="text-lg font-semibold mt-6 mb-2">
            第4条（規約の変更）
          </h2>
          <p>本規約は予告なく変更されることがあります。</p>
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
