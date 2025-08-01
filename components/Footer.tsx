import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div>
              <Image
                src="/neiby_logo_w.png"
                alt="Neibyロゴ"
                width={100}
                height={100}
              />
            </div>
          </div>
          <p className="text-gray-400 text-base">
            あなたらしい健康を東洋医学でサポート
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-medium text-base mb-4">サイトについて</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  Neibyとは
                </Link>
              </li>
              <li>
                <Link
                  href="/owner-blog"
                  className="hover:text-white transition-colors"
                >
                  運営者ブログ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-base mb-4">コンテンツ</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="/articles"
                  className="hover:text-white transition-colors"
                >
                  記事一覧
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  体質診断
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-base mb-4">サポート</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  よくある質問
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-base mb-4">フォローする</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/neiby_yojo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-md flex items-center justify-center p-2"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/Neiby_yojo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-md flex items-center justify-center p-2"
                aria-label="X (Twitter)"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">© 2025 Neiby</p>
            <div className="flex space-x-8 text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
