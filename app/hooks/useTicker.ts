"use client";

import { useState, useEffect, useCallback } from "react";

interface TickerData {
  price: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  loading: boolean;
}

export function useTicker(symbol = "BTC-PERP", intervalMs = 3000) {
  const [ticker, setTicker] = useState<TickerData>({
    price: 0,
    changePercent: 0,
    high: 0,
    low: 0,
    volume: 0,
    loading: true,
  });

  const fetchTicker = useCallback(async () => {
    try {
      const res = await fetch(`/api/market/ticker?symbol=${symbol}`);
      const json = await res.json();
      if (json.code === 0 && json.data) {
        const d = json.data;
        const close = parseFloat(d.close);
        const open = parseFloat(d.open);
        const change = open > 0 ? ((close - open) / open) * 100 : 0;
        setTicker({
          price: close,
          changePercent: change,
          high: parseFloat(d.high),
          low: parseFloat(d.low),
          volume: parseFloat(d.baseVol),
          loading: false,
        });
      }
    } catch {
      // ignore
    }
  }, [symbol]);

  useEffect(() => {
    fetchTicker();
    const id = setInterval(fetchTicker, intervalMs);
    return () => clearInterval(id);
  }, [fetchTicker, intervalMs]);

  return ticker;
}
