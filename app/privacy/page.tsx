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
            Neiby（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本ポリシーでは、当サイトにおける個人情報の取得、利用、管理等について説明いたします。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">1. 個人情報の定義</h2>
          <p>
            「個人情報」とは、氏名、メールアドレス、住所、電話番号、生年月日など、個人を特定できる情報を指します。また、IPアドレス、Cookie、端末情報などのオンライン識別子も含まれます。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">2. 取得する情報</h2>
          <p>
            当サイトでは、以下の情報を取得することがあります：
            <ul className="list-disc pl-5 mt-2">
              <li>
                お問い合わせフォーム等で取得される氏名・メールアドレスなど
              </li>
              <li>アクセス解析のためのCookie情報、IPアドレス、端末情報など</li>
            </ul>
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">3. 利用目的</h2>
          <p>
            取得した個人情報は、以下の目的で利用します：
            <ul className="list-disc pl-5 mt-2">
              <li>お問い合わせ対応</li>
              <li>サービス向上のための分析</li>
              <li>広告配信・マーケティング</li>
              <li>法令に基づく対応</li>
            </ul>
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            4. 第三者提供について
          </h2>
          <p>
            当サイトでは、以下の場合を除き、個人情報を第三者に提供することはありません：
            <ul className="list-disc pl-5 mt-2">
              <li>ご本人の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>業務委託先に対して機密保持契約のもとで提供する場合</li>
              <li>個人を特定できない統計データとしての利用</li>
            </ul>
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            5. Amazonアソシエイト・プログラムについて
          </h2>
          <p>
            当サイトは、Amazonアソシエイト・プログラムの参加者です。これにより、Amazon.co.jpを宣伝しリンクすることで、サイトが紹介料を獲得できるアフィリエイトプログラムに参加しています。
          </p>
          <p className="mt-2">
            このプログラムでは、第三者（Amazonを含む）がコンテンツおよび広告を提供し、ユーザーから直接情報を収集するためにCookie等を使用することがあります。これにより、ユーザーの訪問履歴に基づいて適切な広告を表示することが可能になります。
          </p>
          <p className="mt-2">
            広告におけるCookieの使用を望まない場合は、ブラウザの設定または広告提供事業者のオプトアウトページから無効化することができます。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            6. Cookieの使用について
          </h2>
          <p>
            当サイトでは、アクセス解析や広告配信の最適化のため、Cookieを使用しています。Cookieは個人を特定するものではなく、ブラウザを通じてデバイスに保存される小さなデータです。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            7. Google Analyticsの使用について
          </h2>
          <p>
            当サイトでは、サイトの改善とサービス向上のため、Google
            Inc.が提供するGoogle Analyticsを使用しています。Google
            Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
            <br />
            Google Analyticsの詳細については、
            <a
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Analyticsサービス利用規約
            </a>
            および
            <a
              href="https://policies.google.com/privacy?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Googleプライバシーポリシー
            </a>
            をご確認ください。
            <br />
            この機能を無効にするには、
            <a
              href="https://tools.google.com/dlpage/gaoptout?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Analytics オプトアウトアドオン
            </a>
            をインストールするか、
            <Link
              href="/cookie-settings"
              className="text-blue-600 hover:underline"
            >
              Cookie設定ページ
            </Link>
            から設定を変更してください。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            8. Google AdSenseの使用について
          </h2>
          <p>
            当サイトでは、広告配信のためGoogle Inc.が提供するGoogle AdSenseを使用しています。
            Google AdSenseは、広告配信の最適化とパーソナライゼーションのためにCookieを使用し、
            過去のアクセス情報に基づいて適切な広告を表示します。
            <br /><br />
            Google AdSenseによる広告配信では、以下の情報が収集される場合があります：
            <ul className="list-disc pl-5 mt-2">
              <li>サイト訪問履歴</li>
              <li>地理的位置情報（大まかな地域）</li>
              <li>デバイス情報</li>
              <li>利用者の興味・関心に関する情報</li>
            </ul>
            <br />
            Google AdSenseの詳細については、
            <a
              href="https://policies.google.com/privacy?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Googleプライバシーポリシー
            </a>
            および
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google広告設定
            </a>
            をご確認ください。
            <br />
            パーソナライズ広告を無効にするには、
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google広告設定ページ
            </a>
            から設定を変更するか、
            <Link
              href="/cookie-settings"
              className="text-blue-600 hover:underline"
            >
              Cookie設定ページ
            </Link>
            から広告用Cookieを無効にしてください。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            9. 個人情報の安全管理
          </h2>
          <p>
            当サイトは、個人情報の漏洩、滅失、毀損等を防止するため、必要かつ適切な安全管理措置を講じます。また、健康情報などのセンシティブ情報は医療倫理に基づき厳重に管理し、外部に公開することはありません。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            10. 個人情報の開示・訂正・削除
          </h2>
          <p>
            ご本人からの請求があった場合、保有している個人情報の開示・訂正・削除に対応いたします。詳細は下記の連絡先よりご相談ください。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">11. 免責事項</h2>
          <p>
            当サイトのコンテンツを利用したことにより発生したトラブルや損害等について、当サイトは一切の責任を負いません。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">
            12. プライバシーポリシーの変更
          </h2>
          <p>
            本ポリシーは、法令改正やサービス内容の変更に応じて予告なく更新されることがあります。最新のプライバシーポリシーは常に本ページにてご確認いただけます。
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">13. お問い合わせ</h2>
          <p>
            個人情報の取扱いに関するお問い合わせは、以下のメールアドレスまでお願いいたします。
            <br />
            <strong>Email：</strong>neiby.service@gmail.com
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
