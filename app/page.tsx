import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#0033a0] px-6 pb-12 pt-[max(2rem,env(safe-area-inset-top))]">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">AI-BIT</h1>
      </div>
      <div className="flex w-full max-w-md flex-col gap-4 self-center">
        <Link
          href="/login"
          className="flex w-full items-center justify-center rounded-xl bg-white py-4 text-base font-bold text-[#0033a0] transition-opacity active:opacity-90"
        >
          로그인
        </Link>
        <Link
          href="/signup"
          className="flex w-full items-center justify-center rounded-xl border-2 border-white bg-transparent py-4 text-base font-bold text-white transition-opacity active:opacity-90"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
