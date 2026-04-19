"use client";

import Link from "next/link";
import { useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import TradingChart from "../../components/TradingChart";

const TIME_FRAMES = ["1H", "1D", "1W", "1M", "3M", "1Y", "MAX"];

export default function TradeHedgingPage() {
  const [timeFrame, setTimeFrame] = useState("1H");
  const [sliderValue, setSliderValue] = useState(10);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#F2F4F6] pb-20">
      <AppHeader title="헷징거래" showNotification />

      <div className="mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col gap-3 px-4 pb-4 pt-3">
        {/* Trade mode tabs */}
        <nav className="flex gap-1 rounded-xl border border-[#E5E8EB] bg-white p-1" aria-label="거래 모드">
          <Link href="/trade/general" className="min-w-0 flex-1 rounded-lg py-2.5 text-center text-sm font-semibold text-[#6B7684] hover:bg-[#F2F4F6]">
            일반거래
          </Link>
          <Link href="/trade/hedging" className="min-w-0 flex-1 rounded-lg py-2.5 text-center text-sm font-semibold bg-[#3182F6] text-white shadow-[0_2px_8px_rgba(49,130,246,.3)]">
            헷징거래
          </Link>
        </nav>

        {/* Price Display */}
        <div className="rounded-2xl border border-[#E5E8EB] bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <button type="button" className="flex min-w-0 items-center gap-2.5 rounded-xl py-1 pr-1 text-left transition-colors hover:bg-[#F2F4F6]">
              <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F7931A] to-[#FFB74D] text-[13px] font-extrabold text-white">B</span>
              <span className="min-w-0">
                <span className="flex items-center gap-1 text-[15px] font-bold leading-tight text-[#191F28]">
                  BTCUSDT<span className="text-[10px] text-[#6B7684]">&#9660;</span>
                </span>
                <span className="mt-0.5 block text-[11px] text-[#6B7684]">Perpetual</span>
              </span>
            </button>
            <div className="text-right">
              <p className="text-[22px] font-extrabold tabular-nums tracking-tight text-[#05C072]">68,516.3</p>
              <p className="mt-0.5 text-[11px] text-[#05C072]">&#9650; +2.14%</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white">
          <TradingChart symbol="BTC-PERP" interval={timeFrame} />
          <div className="flex items-center border-t border-[#E5E8EB] px-3 py-2">
            <div className="flex min-w-0 flex-1 flex-nowrap">
              {TIME_FRAMES.map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeFrame(tf)}
                  className={`flex-1 rounded-md py-1.5 text-center text-[11px] font-semibold transition-colors ${
                    timeFrame === tf ? "bg-[#EBF3FF] text-[#3182F6]" : "text-[#6B7684] hover:text-[#191F28]"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
            <button type="button" className="ml-2 flex size-8 shrink-0 items-center justify-center rounded-lg text-[#6B7684] transition-colors hover:bg-[#F2F4F6]" aria-label="전체 화면">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M9 3H5a2 2 0 0 0-2 2v4M21 9V5a2 2 0 0 0-2-2h-4M3 15v4a2 2 0 0 0 2 2h4M15 21h4a2 2 0 0 0 2-2v-4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Long/Short Display */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2.5">
            <div className="flex-1 rounded-[14px] border-[1.5px] border-[#A0EDD0] bg-[#E8FBF3] p-3.5">
              <p className="mb-2 text-[11px] font-bold text-[#05C072]">롱</p>
              <p className="text-2xl font-extrabold tracking-tight text-[#05C072]">+25.32%</p>
            </div>
            <div className="flex-1 rounded-[14px] border-[1.5px] border-[#FFBFC4] bg-[#FFF0F1] p-3.5">
              <p className="mb-2 text-[11px] font-bold text-[#F04452]">숏</p>
              <p className="text-2xl font-extrabold tracking-tight text-[#F04452]">-25.32%</p>
            </div>
          </div>

          {/* Entry Weight Slider */}
          <div className="rounded-2xl border border-[#E5E8EB] bg-white p-4">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-sm font-bold text-[#191F28]">진입 비중 설정</span>
              <span className="rounded-full bg-[#EBF3FF] px-2.5 py-0.5 text-sm font-extrabold text-[#3182F6]">{sliderValue}%</span>
            </div>
            <div className="relative mb-2 h-1.5 cursor-pointer rounded-full bg-[#E5E8EB]">
              <div className="absolute left-0 top-0 h-full rounded-full bg-[#3182F6] transition-[width] duration-100" style={{ width: `${sliderValue}%` }} />
              <div
                className="absolute top-1/2 size-5 -translate-y-1/2 rounded-full bg-[#3182F6] shadow-[0_0_0_3px_#fff,0_0_0_5px_rgba(49,130,246,.2)] transition-[left] duration-100"
                style={{ left: `${sliderValue}%`, marginLeft: -10 }}
              />
            </div>
            <div className="flex justify-between">
              {["0%", "25%", "50%", "75%", "100%"].map((label, i) => (
                <button key={i} type="button" onClick={() => setSliderValue(i * 25)} className="text-[10px] font-medium text-[#B0B8C1]">
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" className="flex h-16 flex-col items-center justify-center gap-0.5 rounded-[14px] bg-gradient-to-br from-[#FFB020] to-[#E09000] text-white shadow-[0_4px_12px_rgba(255,176,32,.3)] transition-transform active:scale-[.97]">
              <span className="text-[10px] font-semibold opacity-75">1</span>
              <span className="text-[13px] font-bold leading-tight">롱/숏</span>
              <span className="text-[13px] font-bold leading-tight">동시진입</span>
            </button>
            <button type="button" className="flex h-16 flex-col items-center justify-center gap-0.5 rounded-[14px] bg-gradient-to-br from-[#F04452] to-[#D6313D] text-white shadow-[0_4px_12px_rgba(240,68,82,.3)] transition-transform active:scale-[.97]">
              <span className="text-[10px] font-semibold opacity-75">2</span>
              <span className="text-[13px] font-bold leading-tight">수익정산</span>
              <span className="text-[13px] font-bold leading-tight">+재진입</span>
            </button>
            <button type="button" className="flex h-16 flex-col items-center justify-center gap-0.5 rounded-[14px] bg-gradient-to-br from-[#05C072] to-[#00A863] text-white shadow-[0_4px_12px_rgba(5,192,114,.3)] transition-transform active:scale-[.97]">
              <span className="text-[10px] font-semibold opacity-75">3</span>
              <span className="text-[13px] font-bold leading-tight">포지션</span>
              <span className="text-[13px] font-bold leading-tight">균등 조정</span>
            </button>
            <button type="button" className="flex h-16 flex-col items-center justify-center gap-0.5 rounded-[14px] border-[1.5px] border-[#FFBFC4] bg-white transition-transform active:scale-[.97]">
              <span className="text-[13px] font-bold leading-tight text-[#F04452]">전체 포지션</span>
              <span className="text-[13px] font-bold leading-tight text-[#F04452]">청산</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
