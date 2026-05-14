"use client";

import { useState } from "react";

export default function Home() {
  const presetAmounts = [500, 1000, 2000, 5000];

  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleDonate = async () => {
    let amount = selectedAmount;

    // カスタム入力がある場合はそちらを優先
    if (customAmount) {
      amount = Number(customAmount);
    }

    // バリデーション
    if (amount < 500 || amount > 100000) {
      alert("寄付金額は500円〜100000円で入力してください");
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          ゆどうふ寄付アプリ
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount("");
              }}
              className={`py-3 rounded-lg border transition ${
                selectedAmount === amount && !customAmount
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {amount.toLocaleString()}円
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            カスタム金額
          </label>

          <input
            type="number"
            min={500}
            max={100000}
            placeholder="500〜100000"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <button
          onClick={handleDonate}
          className="w-full bg-black text-white py-4 rounded-lg text-lg font-bold"
        >
          寄付する
        </button>
      </div>
    </main>
  );
}