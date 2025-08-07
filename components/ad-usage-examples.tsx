/**
 * 記事ページで広告を表示する使用例
 *
 * import { ResponsiveAd, InArticleAd } from "@/components/AdComponents";
 *
 * 使用例1: 記事上部に表示
 * <ResponsiveAd
 *   adSlot="1234567890"
 *   className="mb-6"
 * />
 *
 * 使用例2: 記事の途中に挿入
 * <InArticleAd
 *   adSlot="1234567891"
 *   className="my-8"
 * />
 *
 * 使用例3: 記事下部に表示
 * <ResponsiveAd
 *   adSlot="1234567892"
 *   className="mt-8"
 * />
 *
 * 実際の実装例（記事ページに追加する場合）:
 * app/articles/[slug]/page.tsx の article タグの後に以下を追加
 *
 * <div className="mt-8 border-t pt-6">
 *   <InArticleAd adSlot="記事下部用の広告スロットID" />
 * </div>
 */

export {};
