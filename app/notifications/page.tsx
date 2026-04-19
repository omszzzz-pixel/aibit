"use client";

import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";

const NOTIFICATIONS = [
  {
    icon: <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-lg font-bold text-white">&#8383;</div>,
    title: "헷징 달성 알림",
    messages: [
      "[헷징] 롱 포지션 40% 수익 달성 / BTC/USDT",
      "롱 포지션이 목표 수익률에 도달했습니다.",
      "버튼 2 실행을 확인하세요.",
    ],
    time: "방금 전",
  },
  {
    icon: <div className="size-11 shrink-0 rounded-full bg-gradient-to-br from-sky-200 to-indigo-300 ring-2 ring-white shadow-sm" role="img" aria-label="전문가" />,
    title: "전문가 가격 신호",
    messages: [
      "[신호] BTC/USDT 롱 진입 구간 / 현재가 $83,240 진입 적정 구간 도달.",
      "목표가 $86,500 손절가 $81,000",
    ],
    time: "15분 전",
  },
  {
    icon: <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg">&#128276;</div>,
    title: "전체 공지",
    messages: [
      "[공지] 서버 점검 안내 / 3월 10일(월) 오전 2시~4시 서버 점검이 진행됩니다.",
      "해당 시간 중 거래가 일시 중단됩니다.",
    ],
    time: "2시간 전",
  },
];

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-[#f3f4f6] text-[#111827] pb-20">
      <header className="sticky top-0 z-30 shrink-0 border-b border-black/7 bg-white pt-[env(safe-area-inset-top)] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="mx-auto w-full max-w-lg px-3 pb-3 pt-1 sm:px-4">
          <div className="flex items-start gap-1">
            <button
              type="button"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl text-[#111827] transition-colors hover:bg-gray-100 active:bg-gray-100/80"
              aria-label="뒤로가기"
              onClick={() => router.back()}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="min-w-0 flex-1 pt-2">
              <h1 className="text-lg font-bold tracking-tight text-[#0f172a]">모든 알림</h1>
              <p className="mt-0.5 text-sm text-[#6b7280]">최근 30일 내역</p>
            </div>
            <div className="size-11 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 pb-4 pt-6">
        <div className="space-y-3">
          {NOTIFICATIONS.map((notif, i) => (
            <article key={i} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/[0.04]">
              <div className="flex gap-3">
                {notif.icon}
                <div className="min-w-0 flex-1">
                  <h2 className="text-[15px] font-bold text-[#111827]">{notif.title}</h2>
                  <div className="mt-2 space-y-1.5 text-sm leading-snug text-[#4b5563]">
                    {notif.messages.map((msg, j) => (
                      <p key={j}>{msg}</p>
                    ))}
                  </div>
                  <p className="mt-3 text-right text-xs text-[#9ca3af]">{notif.time}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
