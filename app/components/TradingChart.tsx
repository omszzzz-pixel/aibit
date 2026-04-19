"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  createChart,
  CandlestickSeries,
  ColorType,
  type IChartApi,
  type CandlestickData,
  type Time,
} from "lightweight-charts";

interface TradingChartProps {
  symbol?: string;
  interval?: string;
}

const INTERVAL_MAP: Record<string, string> = {
  "1H": "60",
  "1D": "1d",
  "1W": "1w",
  "1M": "1m",
  "3M": "1m",
  "1Y": "1d",
  "MAX": "1d",
};

const COUNT_MAP: Record<string, number> = {
  "1H": 60,
  "1D": 48,
  "1W": 52,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
  "MAX": 500,
};

export default function TradingChart({
  symbol = "BTC-PERP",
  interval = "1H",
}: TradingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const fetchData = useCallback(async () => {
    const apiInterval = INTERVAL_MAP[interval] || "60";
    const n = COUNT_MAP[interval] || 60;

    try {
      const res = await fetch(
        `/api/market/bars?symbol=${symbol}&interval=${apiInterval}&n=${n}`
      );
      const json = await res.json();

      if (json.code === 0 && json.data) {
        const bars: CandlestickData<Time>[] = json.data.map(
          (bar: { data: { ts: number; o: string; h: string; l: string; c: string } }) => ({
            time: (Math.floor(bar.data.ts / 1000)) as Time,
            open: parseFloat(bar.data.o),
            high: parseFloat(bar.data.h),
            low: parseFloat(bar.data.l),
            close: parseFloat(bar.data.c),
          })
        );
        return bars.sort((a, b) => (a.time as number) - (b.time as number));
      }
    } catch {
      // ignore fetch errors
    }
    return [];
  }, [symbol, interval]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#6B7684",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "#F2F4F6" },
        horzLines: { color: "#F2F4F6" },
      },
      width: containerRef.current.clientWidth,
      height: 276,
      crosshair: {
        vertLine: { color: "#3182F6", width: 1, style: 2 },
        horzLine: { color: "#3182F6", width: 1, style: 2 },
      },
      timeScale: {
        borderColor: "#E5E8EB",
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: "#E5E8EB",
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#05C072",
      downColor: "#F04452",
      borderUpColor: "#05C072",
      borderDownColor: "#F04452",
      wickUpColor: "#05C072",
      wickDownColor: "#F04452",
    });

    chartRef.current = chart;

    fetchData().then((bars) => {
      if (bars.length > 0) {
        series.setData(bars);
        chart.timeScale().fitContent();
      }
    });

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
    };
  }, [fetchData]);

  return <div ref={containerRef} className="w-full" style={{ minHeight: 276 }} />;
}
