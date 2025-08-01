"use client";
import Link from "next/link";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        createdAt: new Date(),
      });
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 flex flex-col items-center justify-center py-24 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">お問い合わせ</h1>
      <p className="text-gray-700 mb-8 text-center max-w-xl">
        ご質問・ご要望などございましたら、下記フォームまたはメールでご連絡ください。
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 w-full max-w-md shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-800 mb-2">
              お名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-800 mb-2">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#1a357b] text-white px-6 py-2 rounded-md font-medium hover:bg-[#2a4a8b] transition"
            disabled={loading}
          >
            {loading ? "送信中..." : "送信"}
          </button>
        </form>
        {success && (
          <p className="mt-4 text-green-600">
            送信が完了しました。ありがとうございます！
          </p>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
      <div className="mt-8 text-gray-500 text-sm">
        メール:{" "}
        <a href="mailto:info@neiby.jp" className="underline">
          neiby.service@gmail.com
        </a>
      </div>
      <Link href="/" className="mt-8 text-blue-700 underline">
        トップページへ戻る
      </Link>
    </div>
  );
}
