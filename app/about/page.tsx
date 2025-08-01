import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 flex flex-col items-center justify-center py-24 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Neibyについて</h1>
      <p className="text-gray-700 mb-8 text-center max-w-xl leading-relaxed">
        Neibyは、東洋医学の知恵とAIテクノロジーをかけ合わせ、
        <br />
        誰でも日常に“養生”を取り入れられる社会を目指すウェルネスメディアです。
        <br />
        <br />
        「病気になってから治す」のではなく、
        <br />
        「病気になる前に自分で気づき、整える」。
        <br />
        そんな“予防”と“セルフケア”の文化を、今ふたたび社会に根づかせるため、
        <br />
        私たちは活動しています。
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 w-full max-w-md shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Neibyが発信すること
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>季節・体質に合ったセルフケア「養生」の実践方法</li>
          <li>東洋医学の基礎をわかりやすく伝える解説記事</li>
          <li>ChatGPTを活用した“対話型養生サポート”の研究と提供</li>
          <li>AIでは補えない部分を補完する、専門家による知見の発信</li>
        </ul>
      </div>

      <p className="text-gray-700 mb-8 text-center max-w-xl leading-relaxed">
        江戸時代の養生文化に学びながら、
        <br />
        誰でも実践できる「現代の養生スタイル」を構築する。
        <br />
        Neibyは、医療に頼りすぎず、自分の心と体を自分で守れる人を増やしたいと考えています。
      </p>

      <p className="text-gray-700 mb-8 text-center max-w-xl leading-relaxed">
        養生は特別なことではなく、
        <br />
        朝の光を浴びること、ゆっくりごはんを食べること、早めに眠ること。
        <br />
        そんな日常の中に、あたらしい健康の選択肢を。
      </p>

      <div className="text-gray-500 text-sm mb-8 text-center">
        運営：Neiby編集部
        <br />
        お問い合わせ：
        <a
          href="/contact"
          className="underline text-blue-700 hover:text-blue-900"
        >
          お問い合わせページへ
        </a>
      </div>

      <div className="text-gray-500 text-sm mb-8">
        <Link
          href="/owner-blog"
          className="underline text-blue-700 hover:text-blue-900"
        >
          運営者ブログ一覧を見る
        </Link>
      </div>
    </div>
  );
}
