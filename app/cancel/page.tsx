import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          決済をキャンセルしました
        </h1>

        <Link
          href="/"
          className="underline text-blue-500"
        >
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}