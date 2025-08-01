"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Question {
  id: string;
  text: string;
  category: string;
  options: string[];
  followUp?: {
    condition: string;
    questions: {
      id: string;
      text: string;
      options: string[];
    }[];
  };
  isFollowUp?: boolean;
}

const questions: Question[] = [
  {
    id: "q1",
    text: "疲れやすいと感じますか？",
    category: "気の不調チェック",
    options: ["はい", "いいえ"],
    followUp: {
      condition: "はい",
      questions: [
        {
          id: "q1a",
          text: "いつ疲れを感じやすいですか？",
          options: ["朝から", "食後に", "夕方以降", "どれも当てはまらない"],
        },
        {
          id: "q1b",
          text: "以下の症状はありますか？",
          options: [
            "息切れしやすい",
            "声に力がない",
            "食後に眠くなる",
            "どれも当てはまらない",
          ],
        },
      ],
    },
  },
  {
    id: "q2",
    text: "イライラしやすい、胸やお腹がつかえる感じはありますか？",
    category: "気の不調チェック",
    options: ["はい", "いいえ"],
    followUp: {
      condition: "はい",
      questions: [
        {
          id: "q2a",
          text: "次の症状はありますか？",
          options: [
            "ため息をよくつく",
            "月経前に不調がある",
            "胸や喉に違和感",
            "どれも当てはまらない",
          ],
        },
      ],
    },
  },
  {
    id: "q3",
    text: "顔色が青白い、めまいがしやすいですか？",
    category: "血の不調チェック",
    options: ["はい", "いいえ"],
    followUp: {
      condition: "はい",
      questions: [
        {
          id: "q3a",
          text: "他に当てはまるものはありますか？",
          options: [
            "爪が割れやすい",
            "動悸がある",
            "夢をよく見る",
            "どれも当てはまらない",
          ],
        },
      ],
    },
  },
  {
    id: "q4",
    text: "肩こりや生理痛がひどいなど、血の巡りが悪いと感じることはありますか？",
    category: "血の不調チェック",
    options: ["はい", "いいえ"],
    followUp: {
      condition: "はい",
      questions: [
        {
          id: "q4a",
          text: "以下の状態はありますか？",
          options: [
            "刺すような痛み",
            "経血に血塊が多い",
            "シミやくすみが目立つ",
            "どれも当てはまらない",
          ],
        },
      ],
    },
  },
  {
    id: "q5",
    text: "むくみやすい、胃がぽちゃぽちゃすることはありますか？",
    category: "水の不調チェック",
    options: ["はい", "いいえ"],
    followUp: {
      condition: "はい",
      questions: [
        {
          id: "q5a",
          text: "どのような症状がありますか？",
          options: [
            "雨の日に体調が悪い",
            "体が重だるい、または関節が重く感じる",
            "舌に歯型がある",
            "どれも当てはまらない",
          ],
        },
      ],
    },
  },
  {
    id: "q6",
    text: "感情の波が激しい、目の疲れやすさはありますか？",
    category: "五臓チェック",
    options: ["はい", "いいえ"],
    followUp: {
      condition: "はい",
      questions: [
        {
          id: "q6a",
          text: "以下はありますか？",
          options: [
            "怒りっぽい",
            "目が乾く、かすむ",
            "月経不順",
            "どれも当てはまらない",
          ],
        },
      ],
    },
  },
  {
    id: "q7",
    text: "不安感が強い、睡眠の不調を感じますか？",
    category: "五臓チェック",
    options: ["はい", "いいえ"],
    followUp: {
      condition: "はい",
      questions: [
        {
          id: "q7a",
          text: "以下はありますか？",
          options: ["動悸がする", "眠りが浅い", "多夢", "どれも当てはまらない"],
        },
      ],
    },
  },
  {
    id: "q8",
    text: "食欲がない、軟便になりやすいですか？",
    category: "五臓チェック",
    options: ["はい", "いいえ"],
    followUp: {
      condition: "はい",
      questions: [
        {
          id: "q8a",
          text: "以下はありますか？",
          options: [
            "食欲がない、または食べたくないことがよくある",
            "下痢・軟便になりやすい",
            "食後すぐにお腹がもたれる",
            "どれも当てはまらない",
          ],
        },
      ],
    },
  },
  {
    id: "q9",
    text: "風邪をひきやすい、肌が乾燥しやすいですか？",
    category: "五臓チェック",
    options: ["はい", "いいえ"],
    followUp: {
      condition: "はい",
      questions: [
        {
          id: "q9a",
          text: "以下はありますか？",
          options: [
            "空咳",
            "肌が乾燥する",
            "鼻水や鼻づまり",
            "どれも当てはまらない",
          ],
        },
      ],
    },
  },
  {
    id: "q10",
    text: "下半身が冷えやすい、足腰がだるくなることがありますか？",
    category: "五臓チェック",
    options: ["はい", "いいえ"],
    followUp: {
      condition: "はい",
      questions: [
        {
          id: "q10a",
          text: "以下はありますか？",
          options: [
            "頻尿・夜間尿がある",
            "足腰のだるさがある",
            "耳鳴り・聴力低下がある",
            "どれも当てはまらない",
          ],
        },
      ],
    },
  },
];

// Scoring system based on Traditional Chinese Medicine analysis
const getBodyTypeScores = (
  answers: Record<string, string>,
  followUpAnswers: Record<string, string[]>
) => {
  const scores = {
    気虚: 0,
    気滞: 0,
    血虚: 0,
    瘀血: 0,
    水滞: 0,
  };

  // Question 1: 疲れやすい (Fatigue) - 気虚
  if (answers.q1 === "はい") {
    scores.気虚 += 1;
    const q1aAnswers = followUpAnswers.q1a || [];
    const q1bAnswers = followUpAnswers.q1b || [];
    if (q1aAnswers.includes("朝から")) scores.気虚 += 1;
    if (q1aAnswers.includes("食後に")) scores.気虚 += 1;
    if (q1aAnswers.includes("夕方以降")) scores.気虚 += 1;
    if (q1bAnswers.includes("息切れしやすい")) scores.気虚 += 1;
    if (q1bAnswers.includes("声に力がない")) scores.気虚 += 1;
    if (q1bAnswers.includes("食後に眠くなる")) scores.気虚 += 1;
  }

  // Question 2: イライラしやすい (Irritability) - 気滞
  if (answers.q2 === "はい") {
    scores.気滞 += 1;
    const q2aAnswers = followUpAnswers.q2a || [];
    if (q2aAnswers.includes("ため息をよくつく")) scores.気滞 += 1;
    if (q2aAnswers.includes("月経前に不調がある")) scores.気滞 += 1;
    if (q2aAnswers.includes("胸や喉に違和感")) scores.気滞 += 1;
  }

  // Question 3: 顔色が青白い (Pale complexion) - 血虚
  if (answers.q3 === "はい") {
    scores.血虚 += 1;
    const q3aAnswers = followUpAnswers.q3a || [];
    if (q3aAnswers.includes("爪が割れやすい")) scores.血虚 += 1;
    if (q3aAnswers.includes("動悸がある")) scores.血虚 += 1;
    if (q3aAnswers.includes("夢をよく見る")) scores.血虚 += 1;
  }

  // Question 4: 血の巡りが悪い (Poor blood circulation) - 瘀血
  if (answers.q4 === "はい") {
    scores.瘀血 += 1;
    const q4aAnswers = followUpAnswers.q4a || [];
    if (q4aAnswers.includes("刺すような痛み")) scores.瘀血 += 1;
    if (q4aAnswers.includes("経血に血塊が多い")) scores.瘀血 += 1;
    if (q4aAnswers.includes("シミやくすみが目立つ")) scores.瘀血 += 1;
  }

  // Question 5: むくみやすい (Swelling) - 水滞
  if (answers.q5 === "はい") {
    scores.水滞 += 1;
    const q5aAnswers = followUpAnswers.q5a || [];
    if (q5aAnswers.includes("雨の日に体調が悪い")) scores.水滞 += 1;
    if (q5aAnswers.includes("体が重だるい、または関節が重く感じる")) scores.水滞 += 1;
    if (q5aAnswers.includes("舌に歯型がある")) scores.水滞 += 1;
  }

  // Question 6: 感情の波が激しい 肝の不調チェック(Emotional fluctuations)
  if (answers.q6 === "はい") {
    scores.気滞 += 1; // 基本スコア
    const q6aAnswers = followUpAnswers.q6a || [];
    if (q6aAnswers.includes("怒りっぽい")) scores.気滞 += 1;
    if (q6aAnswers.includes("月経不順")) scores.気滞 += 1;
    if (q6aAnswers.includes("目が乾く、かすむ")) scores.血虚 += 1;
  }

  // Question 7: 不安感が強い (Strong anxiety)
  if (answers.q7 === "はい") {
    scores.血虚 += 1; // 基本スコア
    scores.気滞 += 1; // 基本スコア
    const q7aAnswers = followUpAnswers.q7a || [];
    if (q7aAnswers.includes("動悸がする")) {
      scores.血虚 += 1;
      scores.気虚 += 1;
    }
    if (q7aAnswers.includes("眠りが浅い")) {
      scores.血虚 += 1;
      scores.気虚 += 1;
    }
    if (q7aAnswers.includes("多夢")) {
      scores.血虚 += 1;
      scores.気虚 += 1;
    }
  }

  // Question 8: 食欲がない (Loss of appetite)
  if (answers.q8 === "はい") {
    scores.気虚 += 1; // 基本スコア
    scores.水滞 += 1; // 基本スコア
    const q8aAnswers = followUpAnswers.q8a || [];
    if (q8aAnswers.includes("食欲がない、または食べたくないことがよくある"))
      scores.気虚 += 1;
    if (q8aAnswers.includes("下痢・軟便になりやすい")) scores.水滞 += 1;
    if (q8aAnswers.includes("食後すぐにお腹がもたれる")) scores.気虚 += 1;
  }

  // Question 9: 風邪をひきやすい (Prone to colds)
  if (answers.q9 === "はい") {
    scores.気虚 += 1; // 基本スコア
    const q9aAnswers = followUpAnswers.q9a || [];
    if (q9aAnswers.includes("鼻水や鼻づまり")) {
      scores.気虚 += 1;
      scores.水滞 += 1;
    }
    if (q9aAnswers.includes("肌が乾燥する")) scores.血虚 += 1;
    if (q9aAnswers.includes("空咳")) scores.血虚 += 1;
  }

  // Question 10: 下半身が冷え (Lower body coldness)
  if (answers.q10 === "はい") {
    scores.気虚 += 1; // 基本スコア
    const q10aAnswers = followUpAnswers.q10a || [];
    if (q10aAnswers.includes("頻尿・夜間尿がある")) scores.気虚 += 1;
    if (q10aAnswers.includes("足腰のだるさがある")) {
      scores.気虚 += 1;
      scores.血虚 += 1;
    }
    if (q10aAnswers.includes("耳鳴り・聴力低下がある")) {
      scores.気虚 += 1;
      scores.血虚 += 1;
    }
  }

  return scores;
};

const getBodyTypeInfo = (type: string) => {
  const info = {
    気虚: {
      name: "気虚",
      description: "気（生命エネルギー）が不足している状態",
      characteristics: [
        "疲れやすい",
        "息切れしやすい",
        "声に力がない",
        "食欲不振",
        "寒がり",
      ],
      recommendations: [
        "十分な睡眠を心がける",
        "消化の良い温かい食事を摂る",
        "無理をせず適度な運動を",
        "ストレスを避けリラックスする時間を作る",
      ],
      color: "bg-stone-50 text-stone-800 border-stone-200",
    },
    気滞: {
      name: "気滞",
      description: "気の流れが滞っている状態",
      characteristics: [
        "イライラしやすい",
        "憂鬱になりやすい",
        "ため息が多い",
        "胸や脇腹の張り",
        "月経前の不調",
      ],
      recommendations: [
        "適度な運動でストレス発散",
        "深呼吸や瞑想を取り入れる",
        "香りの良い食材（柑橘類など）を摂る",
        "規則正しい生活リズムを保つ",
      ],
      color: "bg-slate-50 text-slate-800 border-slate-200",
    },
    血虚: {
      name: "血虚",
      description: "血（栄養物質）が不足している状態",
      characteristics: [
        "顔色が青白い",
        "めまいがしやすい",
        "動悸がある",
        "爪が脆い",
        "肌の乾燥",
      ],
      recommendations: [
        "鉄分豊富な食材を摂る（レバー、ほうれん草など）",
        "良質なタンパク質を意識的に摂取",
        "十分な睡眠で血を養う",
        "目の使いすぎに注意する",
      ],
      color: "bg-zinc-50 text-zinc-800 border-zinc-200",
    },
    瘀血: {
      name: "瘀血",
      description: "血の巡りが滞っている状態",
      characteristics: [
        "刺すような痛み",
        "月経血に血塊が多い",
        "生理痛がひどい",
        "シミやアザが目立つ",
        "肩こりがひどい",
      ],
      recommendations: [
        "適度な運動で血行を促進",
        "体を温める食材を摂る",
        "マッサージやストレッチを習慣に",
        "冷たい飲み物や食べ物を控える",
      ],
      color: "bg-gray-50 text-gray-800 border-gray-200",
    },
    水滞: {
      name: "水滞",
      description: "水分代謝が滞っている状態",
      characteristics: [
        "むくみやすい",
        "胃がポチャポチャ鳴る",
        "身体が重だるい",
        "下痢や軟便",
        "雨の日に体調が悪い",
      ],
      recommendations: [
        "塩分を控えめにする",
        "利尿作用のある食材を摂る（小豆、とうもろこしなど）",
        "適度な運動で発汗を促す",
        "湿度の高い環境を避ける",
      ],
      color: "bg-neutral-50 text-neutral-800 border-neutral-200",
    },
  };
  return info[type as keyof typeof info];
};

export default function QuestionnairePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [followUpQuestions, setFollowUpQuestions] = useState<any[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [followUpAnswers, setFollowUpAnswers] = useState<
    Record<string, string[]>
  >({});

  // Create a flat list of all questions including follow-ups
  const getAllQuestions = () => {
    const allQuestions: any[] = [];
    questions.forEach((q) => {
      allQuestions.push(q);
      // Check if this question has follow-up questions that should be shown
      if (q.followUp && answers[q.id] === q.followUp.condition) {
        const followUps = followUpQuestions.filter(
          (fq) => fq.parentId === q.id
        );
        allQuestions.push(...followUps);
      }
    });

    // Debug logging
    console.log("Current answers:", answers);
    console.log("Follow-up questions:", followUpQuestions);
    console.log("All questions length:", allQuestions.length);
    console.log(
      "Questions with follow-ups:",
      questions.filter((q) => q.followUp)
    );

    return allQuestions;
  };

  const allQuestions = getAllQuestions();
  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = questions.length + followUpQuestions.length;
  const progress = ((currentQuestionIndex + 1) / (totalQuestions || 1)) * 100;

  const handleAnswer = (answer: string, isFollowUp = false) => {
    if (!currentQuestion) return;

    if (isFollowUp) {
      // Handle checkbox selection for follow-up questions
      setFollowUpAnswers((prev) => {
        const currentAnswers = prev[currentQuestion.id] || [];
        const newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter((a) => a !== answer)
          : [...currentAnswers, answer];
        return {
          ...prev,
          [currentQuestion.id]: newAnswers,
        };
      });
      return;
    }

    // Handle single selection for main questions
    setIsTransitioning(true);

    setTimeout(() => {
      // Save the answer
      const newAnswers = {
        ...answers,
        [currentQuestion.id]: answer,
      };
      setAnswers(newAnswers);

      // Check if we need to add follow-up questions
      let newFollowUpQuestions = [...followUpQuestions];
      if (
        currentQuestion.followUp &&
        answer === currentQuestion.followUp.condition
      ) {
        const newFollowUps = currentQuestion.followUp.questions.map(
          (fq: any) => ({
            ...fq,
            parentId: currentQuestion.id,
            category: currentQuestion.category,
            isFollowUp: true,
          })
        );
        newFollowUpQuestions = [...newFollowUpQuestions, ...newFollowUps];
        setFollowUpQuestions(newFollowUpQuestions);
      }

      // Calculate the next index based on updated state
      const allQuestions: any[] = [];
      questions.forEach((q) => {
        allQuestions.push(q);
        if (
          q.followUp &&
          newAnswers[q.id as keyof typeof newAnswers] === q.followUp.condition
        ) {
          const followUps = newFollowUpQuestions.filter(
            (fq) => fq.parentId === q.id
          );
          allQuestions.push(...followUps);
        }
      });

      // Move to next question or show results
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setShowResults(true);
      }

      setIsTransitioning(false);
    }, 250);
  };

  const handleFollowUpNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestionIndex < getAllQuestions().length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setShowResults(true);
      }
      setIsTransitioning(false);
    }, 250);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev - 1);
        setIsTransitioning(false);
      }, 250);
    }
  };

  if (showResults) {
    const scores = getBodyTypeScores(answers, followUpAnswers);
    const dominantType = Object.entries(scores).reduce((a, b) =>
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores]
        ? a
        : b
    )[0];
    const typeInfo = getBodyTypeInfo(dominantType);

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 p-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#1a357b] rounded-lg flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-light text-gray-900 mb-3 tracking-tight">
              診断結果
            </h1>
            <p className="text-base text-gray-600">
              あなたの体質タイプが判明しました
            </p>
          </div>

          {/* Main Result */}
          <Card
            className={`mb-8 border ${typeInfo.color} bg-white shadow-sm rounded-lg overflow-hidden`}
          >
            <CardContent className="p-10 text-center">
              <div className="mb-8">
                <h2 className="text-2xl font-medium mb-3 text-gray-900">
                  {typeInfo.name}体質
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  {typeInfo.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="font-medium text-base mb-3 text-gray-900">
                    主な特徴
                  </h3>
                  <ul className="space-y-3">
                    {typeInfo.characteristics.map((char, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-base mb-3 text-gray-900">
                    おすすめの養生法
                  </h3>
                  <ul className="space-y-3">
                    {typeInfo.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card className="mb-8 bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <CardContent className="p-8">
              <h3 className="font-medium text-base mb-4 text-center text-gray-900">
                体質タイプ別スコア
              </h3>
              <div className="space-y-4">
                {Object.entries(scores).map(([type, score]) => {
                  const info = getBodyTypeInfo(type);
                  const maxScore = Math.max(...Object.values(scores));
                  const percentage =
                    maxScore > 0 ? (score / maxScore) * 100 : 0;
                  return (
                    <div key={type} className="flex items-center">
                      <div className="w-16 text-sm font-medium text-gray-700">
                        {type}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-400 transition-all duration-700 ease-out"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-8 text-sm text-gray-600 font-medium">
                        {score}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Link
              href={`/constitution/${
                dominantType === "気虚"
                  ? "qi-deficiency"
                  : dominantType === "血虚"
                  ? "blood-deficiency"
                  : dominantType === "気滞"
                  ? "qi-stagnation"
                  : dominantType === "瘀血"
                  ? "blood-stasis"
                  : "water-retention"
              }`}
            >
              <Button
                size="lg"
                className="w-full bg-[#1a357b] hover:bg-[#2a4a8b] text-white rounded-md py-3 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                {typeInfo.name}体質の詳しい記事を読む
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button
                variant="outline"
                className="w-full rounded-md py-3 border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200"
              >
                ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-[#1a357b] rounded-md flex items-center justify-center">
              <Image
                src="/neiby_logo.png"
                alt="Neibyロゴ"
                width={32}
                height={32}
              />
            </div>
            <h1 className="text-lg font-medium text-gray-900">
              養生アプリ 初回問診フォーム
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2 text-sm">
            現在の体の状態をチェックして、
            <br />
            結果を保存しましょう
          </p>
        </div>
      </header>

      {/* Progress */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">進歩状況</span>
          <span className="text-sm font-medium text-gray-900">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-200" />
      </div>

      {/* Question Card */}
      <div className="container mx-auto px-4 pb-8">
        <Card
          className={`w-full max-w-lg mx-auto bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 ${
            isTransitioning ? "opacity-60" : "opacity-100"
          }`}
        >
          <CardContent className="p-10">
            {currentQuestion && (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-lg font-medium text-gray-900 leading-relaxed mb-6">
                    {currentQuestion.text}
                  </h2>

                  <div className="space-y-3">
                    {currentQuestion.isFollowUp ? (
                      // Checkbox style for follow-up questions
                      <>
                        {currentQuestion.options.map(
                          (option: string, index: number) => {
                            const isSelected = (
                              followUpAnswers[currentQuestion.id] || []
                            ).includes(option);
                            return (
                              <button
                                key={index}
                                onClick={() => handleAnswer(option, true)}
                                className={`w-full py-3 px-4 text-left text-sm font-medium rounded-md transition-all duration-200 border ${
                                  isSelected
                                    ? "bg-blue-50 border-[#1a357b] text-[#1a357b]"
                                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                                } flex items-center`}
                              >
                                <div
                                  className={`w-4 h-4 rounded border mr-4 flex items-center justify-center transition-all duration-200 ${
                                    isSelected
                                      ? "bg-[#1a357b] border-[#1a357b]"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {isSelected && (
                                    <svg
                                      className="w-2.5 h-2.5 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                                {option}
                              </button>
                            );
                          }
                        )}

                        {/* Next button for follow-up questions */}
                        <div className="mt-8">
                          <Button
                            onClick={handleFollowUpNext}
                            className="w-full bg-[#1a357b] hover:bg-[#2a4a8b] text-white py-3 text-base font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            次へ進む
                          </Button>
                        </div>
                      </>
                    ) : (
                      // Single choice buttons for main questions
                      currentQuestion.options.map(
                        (option: string, index: number) => (
                          <Button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            className={`w-full py-3 text-base font-medium rounded-md transition-all duration-200 ${
                              index === 0
                                ? "bg-[#1a357b] hover:bg-[#2a4a8b] text-white shadow-sm hover:shadow-md"
                                : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {option}
                          </Button>
                        )
                      )
                    )}
                  </div>
                </div>

                {/* Back Button */}
                {currentQuestionIndex > 0 && (
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      className="text-gray-500 hover:text-gray-700 font-medium hover:bg-gray-100 rounded-md px-4 py-2 transition-all duration-200"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      前に戻る
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Category Label */}
        {currentQuestion && (
          <div className="text-center mt-8">
            <span className="text-sm text-gray-600 font-medium bg-gray-100 px-4 py-2 rounded-md border border-gray-200">
              {currentQuestion.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
