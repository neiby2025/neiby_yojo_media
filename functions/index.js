// Cloud Functions SDK をインポート
const functions = require("firebase-functions/v1"); // ここを '/v1' に変更
// Cloud Firestore SDK をインポート
const admin = require("firebase-admin");
admin.initializeApp(); // Firebase Admin SDK を初期化

// メール送信ライブラリをインポート
const nodemailer = require("nodemailer");

// 環境変数からメール送信の設定を取得
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// メール送信の設定（Gmail の例）
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

/**
 * 新しいお問い合わせドキュメントが Firestore に追加されたときにトリガーされる関数
 * contacts コレクションの新しいドキュメントを監視
 * フィールド: name, email, message
 */
exports.sendContactEmail = functions.firestore
    .document("contacts/{docId}")
    .onCreate(async (snap, context) => {
      const contactData = snap.data();

      // メールコンテンツの作成
      const mailOptions = {
        from: `"お問い合わせフォーム" <${gmailEmail}>`,
        to: "neiby.service@gmail.com", // お問い合わせの受取人メールアドレス
        subject: `新しいお問い合わせ: ${contactData.name || "お名前未記入"}`,
        html: `
        <p>新しいお問い合わせが届きました。</p>
        <p><strong>名前:</strong> ${contactData.name || "不明"}</p>
        <p><strong>メールアドレス:</strong> ${contactData.email || "不明"}</p>
        <p><strong>お問い合わせ内容:</strong></p>
        <p>${contactData.message || "なし"}</p>
      `,
      };

      try {
        await mailTransport.sendMail(mailOptions);
        console.log("お問い合わせメールが正常に送信されました！");
      } catch (error) {
        console.error("お問い合わせメールの送信中にエラーが発生しました:", error);
      }

      return null;
    });
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


