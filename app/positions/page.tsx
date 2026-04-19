import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";

const POSITIONS = [
  {
    side: "롱",
    sideArrow: "↑",
    pair: "BTC/USDT",
    pnlPercent: "25.32%",
    pnlColor: "text-emerald-600",
    bgColor: "bg-emerald-500",
    btnColor: "bg-emerald-500 shadow-sm shadow-emerald-500/25",
    entry: "$82,400",
    current: "$83,240",
    qty: "0.05BTC",
    leverage: "100x",
    pnl: "+63.2USDT",
    pnlValueColor: "text-emerald-600",
    liquidation: "$74,900",
    btnLabel: "롱 포지션 청산",
  },
  {
    side: "숏",
    sideArrow: "↓",
    pair: "BTC/USDT",
    pnlPercent: "-25.32%",
    pnlColor: "text-rose-600",
    bgColor: "bg-rose-500",
    btnColor: "bg-rose-500 shadow-sm shadow-rose-500/25",
    entry: "$82,400",
    current: "$83,240",
    qty: "0.05BTC",
    leverage: "100x",
    pnl: "-63.2USDT",
    pnlValueColor: "text-rose-600",
    liquidation: "$91,600",
    btnLabel: "숏 포지션 청산",
  },
];

export default function PositionsPage() {
  return (
    <div className="min-h-dvh bg-white pb-40 text-[#111827]">
      <AppHeader title="포지션 현황" showNotification />

      <div className="mx-auto max-w-lg px-4 pt-4">
        {/* Summary */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/4">
          <p className="text-xs font-medium text-[#6b7280]">전체 합산 실현손익</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-emerald-600 sm:text-3xl">+127.4 USDT</p>
          <p className="mt-1 text-sm font-semibold tabular-nums text-[#111827]">=+184,730 원</p>
        </section>

        {/* Position Cards */}
        <div className="mt-4 flex flex-col gap-4">
          {POSITIONS.map((pos, i) => (
            <article key={i} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold text-white ${pos.bgColor}`}>
                    <span className="flex items-center gap-0.5">
                      {pos.side} <span aria-hidden="true">{pos.sideArrow}</span>
                    </span>
                  </span>
                  <h2 className="truncate text-base font-bold">{pos.pair}</h2>
                </div>
                <span className={`shrink-0 text-sm font-bold tabular-nums ${pos.pnlColor}`}>
                  {pos.pnlPercent}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
                <div>
                  <dt className="text-[11px] text-[#9ca3af]">진입가</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums">{pos.entry}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-[#9ca3af]">현재가</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums">{pos.current}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-[#9ca3af]">수량</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums">{pos.qty}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-[#9ca3af]">레버리지</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums">{pos.leverage}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-[#9ca3af]">평가손익</dt>
                  <dd className={`mt-0.5 font-bold tabular-nums ${pos.pnlValueColor}`}>{pos.pnl}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-[#9ca3af]">청산가</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums text-rose-600">{pos.liquidation}</dd>
                </div>
              </dl>

              <button
                type="button"
                className={`mt-5 w-full rounded-xl py-3.5 text-sm font-bold text-white transition-opacity active:opacity-90 ${pos.btnColor}`}
              >
                {pos.btnLabel}
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Close All Button */}
      <div className="pointer-events-none fixed inset-x-0 z-30 flex justify-center bottom-20">
        <div className="pointer-events-auto w-full max-w-full border-t border-[#e5e7eb] bg-[#f4f6f9]/95 px-4 pb-3 pt-3.5 backdrop-blur-sm 2xl:max-w-[var(--app-column-max)]">
          <div className="mx-auto max-w-lg">
            <button
              type="button"
              className="w-full rounded-xl border-2 border-rose-500 bg-white py-3.5 text-sm font-bold text-rose-600 transition-colors hover:bg-rose-50 active:opacity-90"
            >
              전체 청산
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
