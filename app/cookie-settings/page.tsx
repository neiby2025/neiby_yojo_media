import Link from "next/link";

export default function CookieSettingsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-10 tracking-tight">
          Cookie設定
        </h1>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Cookie使用について</h2>
            <p className="text-gray-700 mb-4">
              当サイトでは、サイトの機能向上とアクセス解析のためにCookieを使用しています。
              以下からCookieの使用に関する設定を変更できます。
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">必須Cookie</h3>
              <p className="text-sm text-gray-600 mb-2">
                サイトの基本機能に必要なCookieです。これらは無効にできません。
              </p>
              <div className="flex items-center">
                <input type="checkbox" checked disabled className="mr-2" />
                <span className="text-sm">常に有効</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">アクセス解析Cookie</h3>
              <p className="text-sm text-gray-600 mb-2">
                Google Analyticsによるサイトの利用状況分析に使用されます。
              </p>
              <button
                id="analytics-toggle"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => {
                  // JavaScript for cookie management
                  const script = document.createElement("script");
                  script.innerHTML = `
                    const currentConsent = document.cookie
                      .split('; ')
                      .find(row => row.startsWith('neiby_cookie_consent='));
                    
                    const isAccepted = currentConsent && currentConsent.split('=')[1] === 'true';
                    
                    if (isAccepted) {
                      document.cookie = 'neiby_cookie_consent=false; path=/; max-age=' + (365 * 24 * 60 * 60);
                      this.textContent = '有効にする';
                      this.className = 'px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors';
                      if (window.gtag) {
                        window.gtag('consent', 'update', {
                          analytics_storage: 'denied',
                          ad_storage: 'denied',
                        });
                      }
                    } else {
                      document.cookie = 'neiby_cookie_consent=true; path=/; max-age=' + (365 * 24 * 60 * 60);
                      this.textContent = '無効にする';
                      this.className = 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors';
                      if (window.gtag) {
                        window.gtag('consent', 'update', {
                          analytics_storage: 'granted',
                          ad_storage: 'granted',
                        });
                      }
                    }
                  `;
                  document.head.appendChild(script);
                }}
              >
                設定を切り替える
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Cookie設定の変更について</h3>
            <p className="text-sm text-gray-600">
              設定を変更した場合、ページを再読み込みすると新しい設定が適用されます。
              詳細については
              <Link href="/privacy" className="text-blue-600 hover:underline">
                プライバシーポリシー
              </Link>
              をご確認ください。
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            トップページへ戻る
          </Link>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            // 現在のCookie設定を表示に反映
            document.addEventListener('DOMContentLoaded', function() {
              const currentConsent = document.cookie
                .split('; ')
                .find(row => row.startsWith('neiby_cookie_consent='));
              
              const button = document.getElementById('analytics-toggle');
              const isAccepted = currentConsent && currentConsent.split('=')[1] === 'true';
              
              if (isAccepted) {
                button.textContent = '無効にする';
                button.className = 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors';
              } else {
                button.textContent = '有効にする';
                button.className = 'px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors';
              }
            });
          `,
        }}
      />
    </main>
  );
}
