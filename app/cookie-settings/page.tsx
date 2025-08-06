import Link from "next/link";
import CookieSettings from "@/components/CookieSettings";

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

          <CookieSettings />

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
    </main>
  );
}
