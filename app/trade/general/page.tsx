"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import TradingChart from "../../components/TradingChart";
import { useTicker } from "../../hooks/useTicker";
import { useBalance } from "../../hooks/useBalance";

const COINS = [
  { symbol: "BTC-PERP", label: "BTCUSDT", icon: "B", gradient: "from-[#F7931A] to-[#FFB74D]" },
  { symbol: "ETH-PERP", label: "ETHUSDT", icon: "E", gradient: "from-[#627EEA] to-[#8B9FEF]" },
  { symbol: "SOL-PERP", label: "SOLUSDT", icon: "S", gradient: "from-[#9945FF] to-[#14F195]" },
  { symbol: "XRP-PERP", label: "XRPUSDT", icon: "X", gradient: "from-[#23292F] to-[#5A6A7A]" },
] as const;

const TIME_FRAMES = ["1H", "1D", "1W", "1M", "3M", "1Y", "MAX"];

export default function TradeGeneralPage() {
  // Coin selection
  const [coinIdx, setCoinIdx] = useState(0);
  const [showCoinList, setShowCoinList] = useState(false);
  const coin = COINS[coinIdx];

  const ticker = useTicker(coin.symbol);
  const balance = useBalance();

  const [timeFrame, setTimeFrame] = useState("1H");
  const [orderMode, setOrderMode] = useState<"enter" | "close">("enter");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [tpsl, setTpsl] = useState(false);
  const [tpPrice, setTpPrice] = useState("");
  const [slPrice, setSlPrice] = useState("");

  // Leverage & Margin
  const [marginType, setMarginType] = useState<"crossed" | "isolated">("crossed");
  const [longLeverage, setLongLeverage] = useState(10);
  const [shortLeverage, setShortLeverage] = useState(10);
  const [showLevModal, setShowLevModal] = useState<"long" | "short" | null>(null);
  const [tempLev, setTempLev] = useState(10);

  // Order state
  const [ordering, setOrdering] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  function showToast(msg: string, type: "ok" | "err") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Last button: fill current price
  function handleLast() {
    if (ticker.price > 0) {
      setPrice(ticker.price.toString());
    }
  }

  // Slider -> quantity calc
  function handleSlider(pct: number) {
    setSliderValue(pct);
    if (balance.availableBalance > 0 && ticker.price > 0) {
      const lev = longLeverage; // use long leverage for calculation
      const usdt = (balance.availableBalance * pct) / 100;
      const qty = (usdt * lev) / ticker.price;
      setQuantity(qty > 0 ? qty.toFixed(5) : "");
    }
  }

  // Margin type toggle
  async function handleMarginToggle() {
    const next = marginType === "crossed" ? "isolated" : "crossed";
    try {
      const res = await fetch("/api/account/margin-type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: coin.symbol, marginType: next }),
      });
      const data = await res.json();
      if (data.code === 0) {
        setMarginType(next);
        showToast(`${next === "crossed" ? "Cross" : "Isolated"} 마진으로 변경됨`, "ok");
      } else {
        showToast(data.message || "마진 타입 변경 실패", "err");
      }
    } catch {
      showToast("서버 연결 실패", "err");
    }
  }

  // Leverage change
  async function handleLevChange() {
    if (!showLevModal) return;
    const side = showLevModal;
    try {
      const res = await fetch("/api/account/leverage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: coin.symbol, leverage: tempLev }),
      });
      const data = await res.json();
      if (data.code === 0) {
        if (side === "long") setLongLeverage(tempLev);
        else setShortLeverage(tempLev);
        showToast(`${side === "long" ? "롱" : "숏"} ${tempLev}X 설정됨`, "ok");
      } else {
        showToast(data.message || "레버리지 변경 실패", "err");
      }
    } catch {
      showToast("서버 연결 실패", "err");
    }
    setShowLevModal(null);
  }

  // Place order
  const handleOrder = useCallback(async (side: "Buy" | "Sell") => {
    if (ordering) return;

    const qty = parseFloat(quantity);
    if (!qty || qty <= 0) {
      showToast("수량을 입력하세요", "err");
      return;
    }

    if (orderType === "limit") {
      const p = parseFloat(price);
      if (!p || p <= 0) {
        showToast("가격을 입력하세요", "err");
        return;
      }
    }

    setOrdering(true);
    try {
      const body: Record<string, unknown> = {
        symbol: coin.symbol,
        orderQty: quantity,
        orderType: orderType === "limit" ? "Limit" : "Market",
        side,
      };
      if (orderType === "limit") body.orderPrice = price;
      if (tpsl && tpPrice) body.posTakeProfitPrice = tpPrice;
      if (tpsl && slPrice) body.posStopLossPrice = slPrice;

      const res = await fetch("/api/order/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok && (data.code === 0 || data.data)) {
        const sideLabel = side === "Buy" ? "롱" : "숏";
        showToast(`${sideLabel} ${orderMode === "enter" ? "진입" : "청산"} 주문 완료`, "ok");
        setQuantity("");
        setPrice("");
        setSliderValue(0);
      } else {
        showToast(data.error || data.message || "주문 실패", "err");
      }
    } catch {
      showToast("서버 연결 실패", "err");
    } finally {
      setOrdering(false);
    }
  }, [ordering, quantity, price, orderType, coin.symbol, tpsl, tpPrice, slPrice, orderMode]);

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

        {/* Price Display + Coin Selector */}
        <div className="rounded-2xl border border-[#E5E8EB] bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="flex min-w-0 items-center gap-2.5 rounded-xl py-1 pr-1 text-left transition-colors hover:bg-[#F2F4F6]"
              onClick={() => setShowCoinList(!showCoinList)}
            >
              <span className={`flex size-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${coin.gradient} text-[13px] font-extrabold text-white`}>
                {coin.icon}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1 text-[15px] font-bold leading-tight text-[#191F28]">
                  {coin.label}<span className="text-[10px] text-[#6B7684]">{showCoinList ? "▲" : "▼"}</span>
                </span>
                <span className="mt-0.5 block text-[11px] text-[#6B7684]">Perpetual</span>
              </span>
            </button>
            <div className="text-right">
              <p className={`text-[22px] font-extrabold tabular-nums tracking-tight ${ticker.changePercent >= 0 ? "text-[#05C072]" : "text-[#F04452]"}`}>
                {ticker.loading ? "---" : ticker.price.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </p>
              <p className={`mt-0.5 text-[11px] ${ticker.changePercent >= 0 ? "text-[#05C072]" : "text-[#F04452]"}`}>
                {ticker.changePercent >= 0 ? "▲" : "▼"} {ticker.changePercent >= 0 ? "+" : ""}{ticker.changePercent.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Coin dropdown */}
          {showCoinList && (
            <div className="mt-3 flex flex-col gap-1 border-t border-[#F2F4F6] pt-3">
              {COINS.map((c, i) => (
                <button
                  key={c.symbol}
                  type="button"
                  onClick={() => { setCoinIdx(i); setShowCoinList(false); }}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    i === coinIdx ? "bg-[#EBF3FF]" : "hover:bg-[#F2F4F6]"
                  }`}
                >
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${c.gradient} text-[11px] font-extrabold text-white`}>
                    {c.icon}
                  </span>
                  <span className="text-sm font-semibold text-[#191F28]">{c.label}</span>
                  {i === coinIdx && <span className="ml-auto text-xs text-[#3182F6]">&#10003;</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white">
          <TradingChart symbol={coin.symbol} interval={timeFrame} />
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
          </div>
        </div>

        {/* Order Form */}
        <div className="overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white">
          <div className="px-4 pt-3.5">
            <p className="mb-3 text-[15px] font-bold text-[#191F28]">주문</p>
            <div className="mb-3.5 flex items-center gap-2">
              {/* Margin Type */}
              <button
                type="button"
                onClick={handleMarginToggle}
                className="inline-flex items-center gap-1 rounded-full bg-[#EBF3FF] px-2.5 py-1 text-xs font-semibold text-[#3182F6]"
              >
                {marginType === "crossed" ? "Cross" : "Isolated"}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>
              {/* Long Leverage */}
              <button
                type="button"
                onClick={() => { setTempLev(longLeverage); setShowLevModal("long"); }}
                className="rounded-full bg-[#E8FBF3] px-2.5 py-1 text-xs font-semibold text-[#05C072]"
              >
                롱 {longLeverage}X
              </button>
              {/* Short Leverage */}
              <button
                type="button"
                onClick={() => { setTempLev(shortLeverage); setShowLevModal("short"); }}
                className="rounded-full bg-[#FFF0F1] px-2.5 py-1 text-xs font-semibold text-[#F04452]"
              >
                숏 {shortLeverage}X
              </button>
            </div>
          </div>

          {/* Enter / Close toggle */}
          <div className="mx-4 mb-3.5 flex rounded-lg bg-[#F8F9FA] p-[3px]">
            {(["enter", "close"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setOrderMode(mode)}
                className={`flex-1 rounded-md py-2 text-center text-[13px] font-semibold transition-all ${
                  orderMode === mode ? "bg-[#3182F6] text-white shadow-[0_2px_8px_rgba(49,130,246,.25)]" : "text-[#6B7684]"
                }`}
              >
                {mode === "enter" ? "진입" : "청산"}
              </button>
            ))}
          </div>

          {/* Limit / Market */}
          <div className="mb-3.5 flex px-4">
            {(["limit", "market"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setOrderType(t)}
                className={`border-b-2 px-3.5 pb-1.5 text-[13px] font-semibold transition-colors ${
                  orderType === t ? "border-[#3182F6] text-[#3182F6]" : "border-transparent text-[#6B7684]"
                }`}
              >
                {t === "limit" ? "지정가" : "시장가"}
              </button>
            ))}
          </div>

          {/* Balance */}
          <div className="mb-2.5 flex items-center justify-between px-4">
            <span className="text-xs text-[#6B7684]">사용가능 잔고</span>
            <span className="text-xs font-semibold text-[#191F28]">
              {balance.loading ? "..." : `${balance.availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`}
            </span>
          </div>

          {/* Price Input (only for limit) */}
          {orderType === "limit" && (
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
                <button
                  type="button"
                  onClick={handleLast}
                  className="ml-1.5 rounded bg-[#EBF3FF] px-2 py-0.5 text-[11px] font-bold text-[#3182F6] active:bg-[#daeaff]"
                >
                  Last
                </button>
              </div>
            </div>
          )}

          {/* Quantity Input */}
          <div className="mb-3 px-4">
            <p className="mb-1.5 text-xs font-medium text-[#6B7684]">수량</p>
            <div className="flex h-12 items-center rounded-lg border-[1.5px] border-[#E5E8EB] bg-[#F8F9FA] px-3 transition-colors focus-within:border-[#3182F6] focus-within:bg-white">
              <input
                type="number"
                placeholder="0.000"
                className="min-w-0 flex-1 border-none bg-transparent text-[15px] font-semibold text-[#191F28] outline-none placeholder:text-[#B0B8C1]"
                value={quantity}
                onChange={(e) => { setQuantity(e.target.value); setSliderValue(0); }}
              />
              <span className="text-xs font-bold text-[#6B7684]">{coin.label.replace("USDT", "")}</span>
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
                  onClick={() => handleSlider(v)}
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

          {/* TP/SL inputs */}
          {tpsl && (
            <div className="flex gap-2 px-4 pb-3">
              <div className="flex-1">
                <p className="mb-1 text-[10px] font-medium text-[#05C072]">이익실현 (TP)</p>
                <input
                  type="number"
                  placeholder="가격"
                  className="w-full rounded-lg border border-[#E5E8EB] bg-[#F8F9FA] px-3 py-2 text-[13px] font-semibold outline-none focus:border-[#05C072]"
                  value={tpPrice}
                  onChange={(e) => setTpPrice(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <p className="mb-1 text-[10px] font-medium text-[#F04452]">손절매 (SL)</p>
                <input
                  type="number"
                  placeholder="가격"
                  className="w-full rounded-lg border border-[#E5E8EB] bg-[#F8F9FA] px-3 py-2 text-[13px] font-semibold outline-none focus:border-[#F04452]"
                  value={slPrice}
                  onChange={(e) => setSlPrice(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="mx-4 h-px bg-[#F8F9FA]" />

          {/* Buy/Sell Buttons */}
          <div className="flex gap-2 p-4">
            <button
              type="button"
              disabled={ordering}
              onClick={() => handleOrder("Buy")}
              className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-[#05C072] to-[#00A863] text-[15px] font-bold text-white shadow-[0_4px_12px_rgba(5,192,114,.3)] transition-transform active:scale-[.97] disabled:opacity-50"
            >
              {ordering ? "처리중..." : `${orderMode === "enter" ? "진입" : "청산"} 롱`}
            </button>
            <button
              type="button"
              disabled={ordering}
              onClick={() => handleOrder("Sell")}
              className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-[#F04452] to-[#D6313D] text-[15px] font-bold text-white shadow-[0_4px_12px_rgba(240,68,82,.3)] transition-transform active:scale-[.97] disabled:opacity-50"
            >
              {ordering ? "처리중..." : `${orderMode === "enter" ? "진입" : "청산"} 숏`}
            </button>
          </div>
        </div>
      </div>

      {/* Leverage Modal */}
      {showLevModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setShowLevModal(null)}>
          <div
            className="w-full max-w-lg rounded-t-3xl bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-center text-base font-bold text-[#191F28]">
              {showLevModal === "long" ? "롱" : "숏"} 레버리지 설정
            </h3>
            <div className="mb-4 text-center">
              <span className="text-4xl font-extrabold text-[#3182F6]">{tempLev}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={tempLev}
              onChange={(e) => setTempLev(parseInt(e.target.value))}
              className="mb-2 w-full accent-[#3182F6]"
            />
            <div className="mb-6 flex justify-between text-[11px] text-[#B0B8C1]">
              <span>1x</span>
              <span>25x</span>
              <span>50x</span>
              <span>75x</span>
              <span>100x</span>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLevModal(null)}
                className="flex-1 rounded-xl border border-[#E5E8EB] py-3.5 text-[15px] font-bold text-[#6B7684]"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleLevChange}
                className="flex-1 rounded-xl bg-[#3182F6] py-3.5 text-[15px] font-bold text-white"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-24 left-1/2 z-[999] -translate-x-1/2 whitespace-nowrap rounded-full px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg transition-all ${
          toast.type === "ok" ? "bg-[#05C072]" : "bg-[#F04452]"
        }`}>
          {toast.msg}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
