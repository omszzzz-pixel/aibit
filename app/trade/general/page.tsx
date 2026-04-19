"use client";

import Link from "next/link";
import { useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";

const TIME_FRAMES = ["1H", "1D", "1W", "1M", "3M", "1Y", "MAX"];

export default function TradeGeneralPage() {
  const [timeFrame, setTimeFrame] = useState("1H");
  const [orderMode, setOrderMode] = useState<"enter" | "close">("enter");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [tpsl, setTpsl] = useState(false);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#F2F4F6] pb-20">
      <AppHeader title="일반거래" showNotification />

      <div className="mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col gap-3 px-4 pb-4 pt-3">
        {/* Trade mode tabs */}
        <nav className="flex gap-1 rounded-xl border border-[#E5E8EB] bg-white p-1" aria-label="거래 모드">
          <Link href="/trade/general" className="min-w-0 flex-1 rounded-lg py-2.5 text-center text-sm font-semibold bg-[#3182F6] text-white shadow-[0_2px_8px_rgba(49,130,246,.3)]">
            일반거래
          </Link>
          <Link href="/trade/hedging" className="min-w-0 flex-1 rounded-lg py-2.5 text-center text-sm font-semibold text-[#6B7684] hover:bg-[#F2F4F6]">
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

        {/* Chart Placeholder */}
        <div className="overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white">
          <div className="w-full overflow-hidden rounded-xl" style={{ minHeight: 276 }} />
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

        {/* Order Form */}
        <div className="overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white">
          <div className="px-4 pt-3.5">
            <p className="mb-3 text-[15px] font-bold text-[#191F28]">주문</p>
            <div className="mb-3.5 flex items-center gap-2">
              <button type="button" className="inline-flex items-center gap-1 rounded-full bg-[#EBF3FF] px-2.5 py-1 text-xs font-semibold text-[#3182F6]">
                Cross
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>
              <button type="button" className="rounded-full bg-[#E8FBF3] px-2.5 py-1 text-xs font-semibold text-[#05C072]">롱 10X</button>
              <button type="button" className="rounded-full bg-[#FFF0F1] px-2.5 py-1 text-xs font-semibold text-[#F04452]">숏 10X</button>
            </div>
          </div>

          {/* Enter / Close toggle */}
          <div className="mx-4 mb-3.5 flex rounded-lg bg-[#F8F9FA] p-[3px]">
            <button
              type="button"
              onClick={() => setOrderMode("enter")}
              className={`flex-1 rounded-md py-2 text-center text-[13px] font-semibold transition-all ${
                orderMode === "enter" ? "bg-[#3182F6] text-white shadow-[0_2px_8px_rgba(49,130,246,.25)]" : "text-[#6B7684]"
              }`}
            >
              진입
            </button>
            <button
              type="button"
              onClick={() => setOrderMode("close")}
              className={`flex-1 rounded-md py-2 text-center text-[13px] font-semibold transition-all ${
                orderMode === "close" ? "bg-[#3182F6] text-white shadow-[0_2px_8px_rgba(49,130,246,.25)]" : "text-[#6B7684]"
              }`}
            >
              청산
            </button>
          </div>

          {/* Limit / Market */}
          <div className="mb-3.5 flex px-4">
            <button
              type="button"
              onClick={() => setOrderType("limit")}
              className={`border-b-2 px-3.5 pb-1.5 text-[13px] font-semibold transition-colors ${
                orderType === "limit" ? "border-[#3182F6] text-[#3182F6]" : "border-transparent text-[#6B7684]"
              }`}
            >
              지정가
            </button>
            <button
              type="button"
              onClick={() => setOrderType("market")}
              className={`border-b-2 px-3.5 pb-1.5 text-[13px] font-semibold transition-colors ${
                orderType === "market" ? "border-[#3182F6] text-[#3182F6]" : "border-transparent text-[#6B7684]"
              }`}
            >
              시장가
            </button>
          </div>

          {/* Balance */}
          <div className="mb-2.5 flex items-center justify-between px-4">
            <span className="text-xs text-[#6B7684]">사용가능 잔고</span>
            <span className="text-xs font-semibold text-[#191F28]">0 USDT</span>
          </div>

          {/* Price Input */}
          <div className="mb-3 px-4">
            <p className="mb-1.5 text-xs font-medium text-[#6B7684]">가격 (USDT)</p>
            <div className="flex h-12 items-center rounded-lg border-[1.5px] border-[#E5E8EB] bg-[#F8F9FA] px-3 transition-colors focus-within:border-[#3182F6] focus-within:bg-white">
              <input
                type="number"
                placeholder="0"
                className="min-w-0 flex-1 border-none bg-transparent text-[15px] font-semibold text-[#191F28] outline-none placeholder:text-[#B0B8C1]"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <button type="button" className="ml-1.5 rounded bg-[#EBF3FF] px-2 py-0.5 text-[11px] font-bold text-[#3182F6]">Last</button>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="mb-3 px-4">
            <p className="mb-1.5 text-xs font-medium text-[#6B7684]">수량</p>
            <div className="flex h-12 items-center rounded-lg border-[1.5px] border-[#E5E8EB] bg-[#F8F9FA] px-3 transition-colors focus-within:border-[#3182F6] focus-within:bg-white">
              <input
                type="number"
                placeholder="0.000"
                className="min-w-0 flex-1 border-none bg-transparent text-[15px] font-semibold text-[#191F28] outline-none placeholder:text-[#B0B8C1]"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <span className="text-xs font-bold text-[#6B7684]">BTC</span>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-3.5 px-4">
            <div className="relative mb-2.5 h-1 cursor-pointer rounded-full bg-[#E5E8EB]">
              <div className="absolute left-0 top-0 h-full rounded-full bg-[#3182F6] transition-[width] duration-100" style={{ width: `${sliderValue}%` }} />
              <div
                className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-[#3182F6] shadow-[0_0_0_3px_#fff,0_0_0_5px_rgba(49,130,246,.2)] transition-[left] duration-100"
                style={{ left: `${sliderValue}%`, marginLeft: -8 }}
              />
            </div>
            <div className="flex justify-between">
              {[0, 25, 50, 75, 100].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSliderValue(v)}
                  className={`text-[10px] font-medium ${sliderValue === v ? "font-bold text-[#3182F6]" : "text-[#B0B8C1]"}`}
                >
                  {v}%
                </button>
              ))}
            </div>
          </div>

          {/* TP/SL */}
          <button
            type="button"
            onClick={() => setTpsl(!tpsl)}
            className="flex w-full items-center gap-2 border-t border-[#F8F9FA] px-4 py-2.5"
          >
            <span className={`flex size-[18px] items-center justify-center rounded border-2 ${tpsl ? "border-[#3182F6] bg-[#3182F6]" : "border-[#E5E8EB] bg-white"}`}>
              {tpsl && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className="text-[13px] font-semibold text-[#191F28]">이익실현 / 손절매</span>
          </button>

          <div className="mx-4 h-px bg-[#F8F9FA]" />

          {/* Buy/Sell Buttons */}
          <div className="flex gap-2 p-4">
            <button
              type="button"
              className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-[#05C072] to-[#00A863] text-[15px] font-bold text-white shadow-[0_4px_12px_rgba(5,192,114,.3)] transition-transform active:scale-[.97]"
            >
              진입 롱
            </button>
            <button
              type="button"
              className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-[#F04452] to-[#D6313D] text-[15px] font-bold text-white shadow-[0_4px_12px_rgba(240,68,82,.3)] transition-transform active:scale-[.97]"
            >
              진입 숏
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
