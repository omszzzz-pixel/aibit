"use client";

import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-[#0033a0] text-white">
      <header className="sticky top-0 z-30 shrink-0 border-b border-black/7 bg-white pt-[env(safe-area-inset-top)] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="mx-auto grid h-12 max-w-lg grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 sm:px-4">
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center justify-self-start rounded-xl text-[#111827] transition-colors hover:bg-gray-100 active:bg-gray-100/80"
            aria-label="뒤로가기"
            onClick={() => router.back()}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="min-w-0 px-1 text-center">
            <h1 className="truncate text-base font-bold tracking-tight text-[#111827]">
              비밀번호 찾기
            </h1>
          </div>
          <div className="flex shrink-0 items-center justify-end gap-1.5 justify-self-end">
            <div className="size-11 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-6 pb-10 pt-4 text-center">
        <p className="text-sm leading-relaxed text-white/80">
          비밀번호 재설정 플로우는 백엔드 연동 후 구현할 수 있습니다.
        </p>
      </main>
    </div>
  );
}
