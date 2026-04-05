"use client";

export default function Home() {
  const handleDonate = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">寄付アプリ</h1>

      <button
        onClick={handleDonate}
        className="bg-black text-white px-6 py-3 rounded"
      >
        1000円寄付する
      </button>
    </main>
  );
}