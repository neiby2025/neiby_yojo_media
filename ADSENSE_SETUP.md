# Google AdSense セットアップガイド

このプロジェクトに Google AdSense が実装されています。以下の手順に従ってセットアップしてください。

## 1. Google AdSense アカウントの準備

1. [Google AdSense](https://www.google.com/adsense/)にアクセスしてアカウントを作成
2. サイトを追加して審査を申請
3. 審査通過後、広告ユニットを作成

## 2. 環境変数の設定

`.env.local`ファイルに以下の環境変数を追加してください：

```bash
# Google AdSense
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-あなたのサイト運営者ID

# Google Analytics（既存）
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 3. 広告の配置

### 基本的な使用方法

```tsx
import { ResponsiveAd, InArticleAd, SidebarAd, FooterAd } from "@/components/AdComponents";

// レスポンシブ広告
<ResponsiveAd adSlot="1234567890" className="mb-6" />

// 記事内広告
<InArticleAd adSlot="1234567891" className="my-8" />

// サイドバー広告
<SidebarAd adSlot="1234567892" />

// フッター広告
<FooterAd adSlot="1234567893" />
```

### 記事ページへの実装例

```tsx
// app/articles/[slug]/page.tsx
import { InArticleAd } from "@/components/AdComponents";

export default function ArticlePage() {
  return (
    <main>
      {/* 記事コンテンツ */}
      <article>{/* 記事内容 */}</article>

      {/* 記事下部の広告 */}
      <div className="mt-8 border-t pt-6">
        <InArticleAd adSlot="あなたの広告スロットID" />
      </div>
    </main>
  );
}
```

## 4. Cookie 同意との連携

このプロジェクトは Cookie 同意システムと連携しています。ユーザーが Cookie に同意した場合のみ広告が表示されます。

## 5. 広告の種類と推奨配置

- **ResponsiveAd**: ページの上部・下部に適している
- **InArticleAd**: 記事の途中や記事下部に適している
- **SidebarAd**: サイドバーに固定サイズで表示
- **FooterAd**: フッター部分に横長で表示

## 6. 注意事項

- 広告スロット ID は実際の AdSense ダッシュボードで作成したものを使用してください
- Cookie 同意がない場合、広告は表示されません
- 広告の配置は Google AdSense のポリシーに従ってください
- 過度な広告配置はユーザビリティを損なう可能性があります

## 7. テスト方法

1. 開発環境で Cookie 同意を有効にする
2. ブラウザの開発者ツールでネットワークタブを確認
3. AdSense スクリプトが正常に読み込まれているか確認
4. 広告領域が表示されているか確認

本番環境では、AdSense の審査通過後に実際の広告が表示されます。
