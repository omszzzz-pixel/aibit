"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

const LEGAL_TITLES: Record<string, string> = {
  terms: "서비스 이용약관",
  privacy: "개인정보 처리방침",
  risk: "투자위험 고지",
  marketing: "마케팅 정보 수신",
};

export default function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const title = LEGAL_TITLES[slug] || slug;

  return (
    <div className="min-h-dvh bg-[#080c14] text-white">
      <header className="sticky top-0 z-30 shrink-0 border-b border-white/10 bg-[#080c14] pt-[env(safe-area-inset-top)]">
        <div className="mx-auto grid h-12 max-w-lg grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 sm:px-4">
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center justify-self-start rounded-xl text-white transition-colors hover:bg-white/10 active:bg-white/5"
            aria-label="뒤로가기"
            onClick={() => router.back()}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="min-w-0 px-1 text-center">
            <h1 className="truncate text-base font-bold tracking-tight text-white">
              {title}
            </h1>
          </div>
          <div className="flex shrink-0 items-center justify-end gap-1.5 justify-self-end">
            <div className="size-11 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 pt-6">
        <p className="text-sm leading-relaxed text-white/55">
          법무 검토 후 본문이 게시됩니다.
        </p>
      </div>
    </div>
  );
}
