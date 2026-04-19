"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TERMS = [
  { key: "terms", label: "서비스 이용약관", required: true, href: "/legal/terms" },
  { key: "privacy", label: "개인정보 처리방침", required: true, href: "/legal/privacy" },
  { key: "risk", label: "투자위험 고지 동의", required: true, href: "/legal/risk" },
  { key: "marketing", label: "마케팅 정보 수신 동의", required: false, href: "/legal/marketing" },
] as const;

type TermKey = (typeof TERMS)[number]["key"];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1: Terms
  const [agreed, setAgreed] = useState<Record<TermKey, boolean>>({
    terms: false,
    privacy: false,
    risk: false,
    marketing: false,
  });

  // Step 2: Email/Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Step 3: Profile
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  // Step 4: Complete
  const totalSteps = 4;

  const allRequired = TERMS.filter((t) => t.required).every((t) => agreed[t.key]);
  const allChecked = TERMS.every((t) => agreed[t.key]);

  function toggleAll() {
    const next = !allChecked;
    setAgreed({ terms: next, privacy: next, risk: next, marketing: next });
  }

  function toggle(key: TermKey) {
    setAgreed((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function canProceed() {
    switch (step) {
      case 1:
        return allRequired;
      case 2:
        return email.length > 0 && password.length >= 6 && password === passwordConfirm;
      case 3:
        return nickname.length > 0;
      default:
        return false;
    }
  }

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleNext() {
    if (step === 3) {
      // 마지막 입력 단계 → 서버에 회원가입 요청
      setError("");
      setLoading(true);
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, nickname, phone }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "회원가입에 실패했습니다");
          return;
        }
        setStep(4);
      } catch {
        setError("서버 연결에 실패했습니다");
      } finally {
        setLoading(false);
      }
    } else if (step < totalSteps) {
      setStep(step + 1);
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
    else router.push("/");
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#080c14] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 shrink-0 border-b border-white/[0.06] bg-[#080c14] px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="relative mx-auto flex max-w-md items-center justify-center py-3">
          <button
            type="button"
            className="absolute left-0 flex size-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10"
            aria-label="뒤로"
            onClick={handleBack}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-center text-base font-semibold tracking-tight">
            {step === 1 && "약관 동의"}
            {step === 2 && "계정 정보"}
            {step === 3 && "프로필 설정"}
            {step === 4 && "가입 완료"}
          </h1>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-1 max-w-md">
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < step ? "bg-[#2f6ff2]" : "bg-white/15"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-white/45">{step}/{totalSteps} 단계</p>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {/* Step 1: Terms Agreement */}
        {step === 1 && (
          <div className="flex flex-1 flex-col gap-4 pt-2">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl bg-[#122038] px-4 py-4 text-left ring-1 ring-white/10 transition-colors hover:bg-[#152440]"
              onClick={toggleAll}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded border-2 ${
                  allChecked
                    ? "border-[#2f6ff2] bg-[#2f6ff2]"
                    : "border-white/35 bg-transparent"
                }`}
                aria-hidden="true"
              >
                {allChecked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-base font-semibold">전체 동의</span>
            </button>

            <ul className="flex flex-col gap-2">
              {TERMS.map((term) => (
                <li
                  key={term.key}
                  className="flex items-stretch gap-2 rounded-2xl bg-[#0e1524] ring-1 ring-white/[0.06]"
                >
                  <button
                    type="button"
                    className="flex flex-1 items-center gap-3 px-3 py-3.5 text-left"
                    onClick={() => toggle(term.key)}
                  >
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded border-2 ${
                        agreed[term.key]
                          ? "border-[#2f6ff2] bg-[#2f6ff2]"
                          : "border-white/35 bg-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      {agreed[term.key] && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-medium leading-snug">
                        {term.label}
                      </span>
                      <span
                        className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          term.required
                            ? "bg-red-500/15 text-red-300"
                            : "bg-white/10 text-white/55"
                        }`}
                      >
                        {term.required ? "필수" : "선택"}
                      </span>
                    </span>
                  </button>
                  <Link
                    href={term.href}
                    className="flex w-11 shrink-0 items-center justify-center border-l border-white/[0.06] text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
                    aria-label={`${term.label} 자세히`}
                  >
                    <span className="text-lg">&rsaquo;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Step 2: Account Info */}
        {step === 2 && (
          <div className="flex flex-1 flex-col gap-5 pt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="signup-email" className="text-sm font-medium text-white/80">
                이메일
              </label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="example@email.com"
                className="rounded-xl border border-white/15 bg-[#0e1524] px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[#2f6ff2]/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="signup-password" className="text-sm font-medium text-white/80">
                비밀번호
              </label>
              <input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                placeholder="6자 이상 입력"
                className="rounded-xl border border-white/15 bg-[#0e1524] px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[#2f6ff2]/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="signup-password-confirm" className="text-sm font-medium text-white/80">
                비밀번호 확인
              </label>
              <input
                id="signup-password-confirm"
                type="password"
                autoComplete="new-password"
                placeholder="비밀번호를 다시 입력"
                className="rounded-xl border border-white/15 bg-[#0e1524] px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[#2f6ff2]/50"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {passwordConfirm.length > 0 && password !== passwordConfirm && (
                <p className="text-xs text-red-400">비밀번호가 일치하지 않습니다</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Profile */}
        {step === 3 && (
          <div className="flex flex-1 flex-col gap-5 pt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="nickname" className="text-sm font-medium text-white/80">
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                className="rounded-xl border border-white/15 bg-[#0e1524] px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[#2f6ff2]/50"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-white/80">
                전화번호 <span className="text-white/40">(선택)</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="010-0000-0000"
                className="rounded-xl border border-white/15 bg-[#0e1524] px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[#2f6ff2]/50"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 4 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#2f6ff2]/20">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2f6ff2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">가입이 완료되었습니다!</h2>
              <p className="mt-2 text-sm text-white/60">
                AI-BIT에 오신 것을 환영합니다
              </p>
            </div>
            <Link
              href="/home"
              className="mt-4 w-full max-w-xs rounded-2xl bg-[#2f6ff2] py-4 text-center text-base font-bold text-white shadow-lg shadow-[#2f6ff2]/25 transition-opacity active:opacity-90"
            >
              시작하기
            </Link>
          </div>
        )}

        {/* Next button (steps 1-3) */}
        {step < totalSteps && (
          <div className="mt-auto shrink-0 pt-6">
            {error && (
              <p className="mb-3 rounded-lg bg-red-500/20 px-4 py-2.5 text-sm font-medium text-white">
                {error}
              </p>
            )}
            <button
              type="button"
              disabled={!canProceed() || loading}
              onClick={handleNext}
              className="w-full rounded-2xl bg-[#2f6ff2] py-4 text-base font-bold text-white shadow-lg shadow-[#2f6ff2]/25 transition-opacity disabled:cursor-not-allowed disabled:opacity-35 enabled:active:opacity-90"
            >
              {loading ? "처리 중..." : "다음"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
