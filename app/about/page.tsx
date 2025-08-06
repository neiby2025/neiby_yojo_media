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

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full max-w-2xl shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Neibyの歩み
        </h2>
        <div className="text-gray-700 text-sm leading-relaxed space-y-3">
          <div className="flex items-start space-x-3">
            <span className="font-semibold text-blue-700 min-w-[60px]">
              2024年
            </span>
            <span>Neiby事業構想開始</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="font-semibold text-blue-700 min-w-[60px]">
              2025年
            </span>
            <span>養生メディア「Neiby」運営開始</span>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>メンバー：</strong>
              薬剤師の佐藤、鍼灸師の平井をはじめとする東洋医学とヘルスケアの専門家チーム
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 w-full max-w-2xl shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          サイト運営について
        </h2>
        <div className="text-gray-700 text-sm leading-relaxed space-y-3">
          <p>
            <strong>運営：</strong>Neiby編集部
          </p>
          <p>
            <strong>収益について：</strong>
            当サイトは、Amazonアソシエイト・プログラムをはじめとする各種アフィリエイトプログラムに参加しており、
            商品やサービスの紹介を通じて収益を得ています。これらの収益は、サイトの運営費用やコンテンツの質向上のために使用されています。
          </p>
          <p>
            アフィリエイトリンクを含む記事においても、読者の皆様にとって価値のある情報提供を最優先に考え、
            実際に使用・検証した商品やサービスのみをご紹介するよう心がけています。
          </p>
          <p>
            詳細については、
            <Link
              href="/terms"
              className="text-blue-700 hover:text-blue-900 underline"
            >
              利用規約
            </Link>
            および
            <Link
              href="/privacy"
              className="text-blue-700 hover:text-blue-900 underline"
            >
              プライバシーポリシー
            </Link>
            をご確認ください。
          </p>
        </div>
      </div>

      <div className="text-gray-500 text-sm mb-8 text-center">
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
