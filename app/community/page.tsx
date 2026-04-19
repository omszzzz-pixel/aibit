"use client";

import { useState } from "react";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";

const PODIUM = [
  { rank: 2, name: "김민준", surname: "김", amount: "+4,820 USDT", size: "size-[46px] text-[15px]", barH: 40, bgAlpha: "bg-white/[.18]" },
  { rank: 1, name: "이서연", surname: "이", amount: "+8,340 USDT", size: "size-14 text-lg", barH: 60, bgAlpha: "bg-white/25", crown: true },
  { rank: 3, name: "박지훈", surname: "박", amount: "+3,150 USDT", size: "size-[46px] text-[15px]", barH: 28, bgAlpha: "bg-white/[.18]" },
];

const RANKING = [
  { rank: 4, name: "최현우", surname: "최", amount: "+2,410 USDT", type: "일반거래", typeColor: "bg-[#EBF3FF] text-[#3182F6]", change: "▲ 2", changeColor: "text-[#05C072]", gradient: "from-[#9B59B6] to-[#7D3C98]" },
  { rank: 5, name: "정다은", surname: "정", amount: "+1,980 USDT", type: "헷징거래", typeColor: "bg-[#E8FBF3] text-[#05C072]", change: "— 유지", changeColor: "text-[#B0B8C1]", gradient: "from-[#E67E22] to-[#CA6F1E]" },
  { rank: 6, name: "한승민", surname: "한", amount: "+1,630 USDT", type: "헷징거래", typeColor: "bg-[#E8FBF3] text-[#05C072]", change: "▲ 1", changeColor: "text-[#05C072]", gradient: "from-[#1ABC9C] to-[#148F77]" },
  { rank: 7, name: "오태양", surname: "오", amount: "+1,290 USDT", type: "일반거래", typeColor: "bg-[#EBF3FF] text-[#3182F6]", change: "▼ 3", changeColor: "text-[#F04452]", gradient: "from-[#3182F6] to-[#1B64DA]" },
  { rank: 8, name: "윤지아", surname: "윤", amount: "+1,050 USDT", type: "일반거래", typeColor: "bg-[#EBF3FF] text-[#3182F6]", change: "▼ 1", changeColor: "text-[#F04452]", gradient: "from-[#F04452] to-[#D6313D]" },
];

export default function CommunityPage() {
  const [tab, setTab] = useState<"ranking" | "events">("ranking");
  const [period, setPeriod] = useState<"weekly" | "monthly" | "total">("weekly");

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#F2F4F6] text-[#191F28] pb-20">
      <AppHeader title="커뮤니티" showNotification />

      {/* Tabs */}
      <div className="sticky top-12 z-[90] flex border-b border-[#E5E8EB] bg-white">
        <button
          type="button"
          onClick={() => setTab("ranking")}
          className={`flex-1 border-b-2 py-3.5 text-center text-[15px] font-bold transition-colors ${
            tab === "ranking" ? "border-[#3182F6] text-[#3182F6]" : "border-transparent text-[#6B7684]"
          }`}
        >
          수익 랭킹
        </button>
        <button
          type="button"
          onClick={() => setTab("events")}
          className={`flex-1 border-b-2 py-3.5 text-center text-[15px] font-bold transition-colors ${
            tab === "events" ? "border-[#3182F6] text-[#3182F6]" : "border-transparent text-[#6B7684]"
          }`}
        >
          이벤트 &amp; 공지
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex items-end justify-between px-4 pb-3 pt-5">
          <h2 className="text-lg font-extrabold">이번 주 수익 랭킹 &#127942;</h2>
          <span className="text-xs font-medium text-[#6B7684]">3/25 – 3/31 · 수익금 기준</span>
        </div>

        {/* Period Filter */}
        <div className="flex gap-1.5 px-4 pb-4">
          {([["weekly", "주간"], ["monthly", "월간"], ["total", "누적"]] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setPeriod(key)}
              className={`rounded-full border-[1.5px] px-3.5 py-1 text-xs font-semibold transition-all ${
                period === key
                  ? "border-[#3182F6] bg-[#3182F6] text-white"
                  : "border-[#E5E8EB] bg-white text-[#6B7684]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div className="mx-4 mb-4 flex items-end justify-center gap-3 rounded-2xl bg-gradient-to-br from-[#1B4FD8] to-[#3182F6] px-4 py-5">
          {PODIUM.map((p) => (
            <div key={p.rank} className="flex flex-1 flex-col items-center gap-1.5">
              <div className={`relative flex ${p.size} items-center justify-center rounded-full font-extrabold text-white ${p.bgAlpha}`}>
                {p.crown && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-base">&#128081;</span>}
                {p.surname}
              </div>
              <span className="text-xs font-bold text-white">{p.name}</span>
              <span className="text-[13px] font-extrabold text-white">{p.amount}</span>
              <span className="text-[10px] text-white/70">{p.rank}위</span>
              <div className="w-full rounded-t bg-white/15" style={{ height: p.barH }} />
            </div>
          ))}
        </div>

        {/* Ranking List */}
        <div className="flex flex-col gap-2 px-4 pb-8">
          {RANKING.map((r) => (
            <div key={r.rank} className="flex items-center gap-3 rounded-[14px] border border-[#E5E8EB] bg-white px-4 py-3.5 transition-transform active:scale-[.98]">
              <span className={`w-6 shrink-0 text-center text-[15px] font-extrabold ${r.rank <= 5 ? "text-[#3182F6]" : "text-[#B0B8C1]"}`}>
                {r.rank}
              </span>
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
              >
                <div className={`flex size-10 items-center justify-center rounded-full bg-gradient-to-br ${r.gradient} text-sm font-extrabold text-white`}>
                  {r.surname}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.name}</p>
                <span className={`mt-1 inline-block rounded px-[7px] py-[2px] text-[10px] font-bold ${r.typeColor}`}>
                  {r.type}
                </span>
              </div>
              <div className="text-right">
                <p className="text-base font-extrabold text-[#05C072]">{r.amount}</p>
                <p className={`mt-0.5 text-[10px] font-semibold ${r.changeColor}`}>{r.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
