import Link from "next/link";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-10 tracking-tight">
          よくある質問
        </h1>
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Q. Neibyはどんなサービスですか？
          </h2>
          <p className="text-gray-700 mb-6">
            東洋医学の知恵とAIを活用し、体質診断やセルフケア情報を提供するウェルネスメディアを運営しています。養生とAIを掛け合わせたアプリ開発にも取り組んでいます。
          </p>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Q. 体質診断は無料ですか？
          </h2>
          <p className="text-gray-700 mb-6">
            はい、どなたでも無料でご利用いただけます。なお、診断はあくまで体質の傾向であり、医療的診断には該当しません。
          </p>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Q. 記事の内容は専門家が監修していますか？
          </h2>
          <p className="text-gray-700 mb-6">
            東洋医学の文献をもとにAIが執筆したものを、薬剤師や鍼灸師等の医療従事者や東洋医学の専門家が監修しています。
          </p>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Q. お問い合わせはどこからできますか？
          </h2>
          <p className="text-gray-700">
            <Link href="/contact" className="text-blue-600 hover:underline">
              お問い合わせページ
            </Link>
            よりご連絡ください。
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
