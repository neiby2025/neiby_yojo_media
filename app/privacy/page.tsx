import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-10 tracking-tight">
          プライバシーポリシー
        </h1>
        <div className="bg-white rounded-lg shadow p-8 mb-8 text-gray-700 text-sm leading-relaxed">
          <p>
            Neiby（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。取得する情報、利用目的、管理方法等について以下の通り定めます。
          </p>
          <h2 className="text-lg font-semibold mt-6 mb-2">1. 取得する情報</h2>
          <p>お問い合わせフォーム等で取得する氏名・メールアドレス等。</p>
          <h2 className="text-lg font-semibold mt-6 mb-2">2. 利用目的</h2>
          <p>ご質問への回答、サービス向上のための分析等。</p>
          <h2 className="text-lg font-semibold mt-6 mb-2">3. 情報の管理</h2>
          <p>取得した個人情報は適切に管理し、第三者に提供しません。</p>
          <h2 className="text-lg font-semibold mt-6 mb-2">4. 免責事項</h2>
          <p>当サイトの利用により生じた損害について一切の責任を負いません。</p>
          <h2 className="text-lg font-semibold mt-6 mb-2">5. 改定</h2>
          <p>本ポリシーは予告なく改定されることがあります当サイトでは、第三者配信の広告サービス（Amazonアソシエイト含む）を利用しています。
このような広告配信事業者は、ユーザーの興味に応じた商品・サービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報『Cookie』を使用することがあります。

Amazonのアソシエイトとして、当メディアは適格販売により収入を得ています。
。</p>
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
