import Link from "next/link";
import BottomNav from "../components/BottomNav";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-white text-[#111827]">
      <div className="mx-auto max-w-lg px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        {/* Header */}
        <header className="flex items-start justify-between gap-4 pb-6">
          <div>
            <p className="text-sm text-[#6b7280]">안녕하세요</p>
            <p className="mt-0.5 text-xl font-bold tracking-tight">홍길동님</p>
          </div>
          <Link
            href="/notifications"
            className="relative flex size-11 items-center justify-center rounded-full bg-white text-[#374151] shadow-sm ring-1 ring-black/4 transition-colors hover:bg-gray-50"
            aria-label="알림"
          >
            <svg className="size-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-[#2f6ff2] px-1 text-[10px] font-bold text-white">
              3
            </span>
          </Link>
        </header>

        <div className="flex flex-col gap-4">
          {/* Monthly Profit Card */}
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/4">
            <p className="text-xs font-medium text-[#6b7280]">이번달 확정 수익</p>
            <p className="mt-2 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
              11,589,000
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#f3f4f6] pt-5 text-center">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#9ca3af]">완료거래</span>
                <span className="text-sm tabular-nums font-semibold text-[#111827]">18건</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#9ca3af]">승률</span>
                <span className="text-sm tabular-nums font-bold text-[#2f6ff2]">72%</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#9ca3af]">헷징실행</span>
                <span className="text-sm tabular-nums font-semibold text-[#111827]">6회</span>
              </div>
            </div>
          </section>

          {/* Active Positions */}
          <Link
            href="/positions"
            className="block rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/4 transition-colors hover:bg-gray-50/80 active:bg-gray-50"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">진행 중인 포지션</h2>
              <span className="text-xs font-semibold text-[#2f6ff2]">자세히보기</span>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              <li className="flex items-center gap-3 rounded-xl bg-[#f3f4f6] px-3 py-3">
                <span className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  롱 100x
                </span>
                <span className="min-w-0 flex-1 text-sm font-semibold">BTC/USDT</span>
                <span className="shrink-0 text-sm font-bold tabular-nums text-[#2f6ff2]">+25%</span>
              </li>
              <li className="flex items-center gap-3 rounded-xl bg-[#f3f4f6] px-3 py-3">
                <span className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold bg-rose-100 text-rose-800">
                  숏 100x
                </span>
                <span className="min-w-0 flex-1 text-sm font-semibold">BTC/USDT</span>
                <span className="shrink-0 text-sm font-bold tabular-nums text-rose-600">-25%</span>
              </li>
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-[#9ca3af]">
              진행 중 수익률은 포지션 탭에서 확인할 수 있어요.
            </p>
          </Link>

          {/* Event Progress */}
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">이벤트 거래량 달성</h2>
              <span className="text-sm font-bold tabular-nums text-[#2f6ff2]">68%</span>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
              <div
                className="h-full rounded-full bg-[#2f6ff2] transition-[width] duration-300"
                style={{ width: "68%" }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6b7280]">
              <span className="font-medium text-[#374151]">$6,800 달성</span>
              <span>목표 $10,000 · $3,200 남음</span>
            </div>
          </section>
        </div>
      </div>

      {/* Trade Dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center">
        <div className="pointer-events-auto w-full max-w-full overflow-hidden border-t border-[#e5e7eb] bg-[#f4f6f9]/95 shadow-[0_-6px_24px_rgba(0,0,0,0.06)] backdrop-blur-md 2xl:max-w-[var(--app-column-max)]">
          <div className="border-b border-[#e5e7eb]/90 px-4 pt-4 pb-3">
            <div className="mx-auto flex max-w-lg gap-3">
              <Link
                href="/trade/general"
                className="flex min-h-[52px] flex-1 items-center justify-center rounded-xl bg-[#2f6ff2] py-3.5 text-[15px] font-bold text-white shadow-sm transition-opacity active:opacity-90"
              >
                일반거래
              </Link>
              <Link
                href="/trade/hedging"
                className="flex min-h-[52px] flex-1 items-center justify-center rounded-xl border-2 border-[#2f6ff2] bg-white py-3.5 text-[15px] font-bold text-[#2f6ff2] transition-colors hover:bg-[#2f6ff2]/5 active:opacity-90"
              >
                헷징거래
              </Link>
            </div>
          </div>
          <div className="bg-white/95">
            <BottomNav inline />
          </div>
        </div>
      </div>
    </div>
  );
}
