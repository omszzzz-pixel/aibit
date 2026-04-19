"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "로그인에 실패했습니다");
        return;
      }

      router.push("/home");
    } catch {
      setError("서버 연결에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#0033a0] px-6 pb-10 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <header className="mb-10 flex items-center justify-center">
        <Link href="/" className="text-3xl font-bold tracking-tight text-white">
          AI-BIT
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center">
        <form
          className="flex w-full max-w-md flex-col gap-5"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-white">
              이메일
            </label>
            <input
              id="email"
              type="text"
              autoComplete="username"
              placeholder="example@email.com"
              className="rounded-lg border border-white/90 bg-transparent px-4 py-3 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-white">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="rounded-lg border border-white/90 bg-transparent px-4 py-3 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between gap-3 text-sm text-white">
            <label className="flex cursor-pointer items-center gap-2 select-none">
              <input
                type="checkbox"
                className="size-4 shrink-0 rounded border-white bg-transparent accent-white"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              로그인 유지
            </label>
            <Link
              href="/forgot-password"
              className="shrink-0 underline-offset-2 hover:underline"
            >
              비밀번호 찾기
            </Link>
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/20 px-4 py-2.5 text-sm font-medium text-white">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-xl bg-white py-4 text-base font-bold text-[#0033a0] transition-opacity enabled:active:opacity-90 disabled:opacity-60"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>

          <div className="flex items-center gap-3 py-2">
            <span className="h-px flex-1 bg-white/60" aria-hidden="true" />
            <span className="text-sm text-white/90">또는</span>
            <span className="h-px flex-1 bg-white/60" aria-hidden="true" />
          </div>

          <Link
            href="/signup"
            className="flex w-full items-center justify-center rounded-xl border-2 border-white py-4 text-base font-bold text-white transition-opacity active:opacity-90"
          >
            회원가입
          </Link>
        </form>
      </main>
    </div>
  );
}
