"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Image
              src="/neiby_logo.png"
              alt="Neibyロゴ"
              width={100}
              height={100}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
        {/* ハンバーガーメニュー（スマホ用） */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-gray-100"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="メニューを開く"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {/* PC用ナビゲーション */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/articles"
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            記事
          </Link>
          <Link
            href="/questionnaire"
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            体質診断
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            Neibyについて
          </Link>
          <Link
            href="/#categories"
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            カテゴリ
          </Link>
          <Link
            href="/articles/tags"
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            タグ一覧
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            お問い合わせ
          </Link>
        </nav>
      </div>
      {/* スマホ用メニュー */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-b border-gray-200 px-4 py-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href="/articles"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                記事
              </Link>
            </li>
            <li>
              <Link
                href="/questionnaire"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                体質診断
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Neibyについて
              </Link>
            </li>
            <li>
              <Link
                href="/#categories"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                カテゴリ
              </Link>
            </li>
            <li>
              <Link
                href="/articles/tags"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                タグ一覧
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
