"use client";

import { useState, useEffect, useCallback } from "react";

interface BalanceData {
  availableBalance: number;
  loading: boolean;
  error: string | null;
}

export function useBalance(intervalMs = 10000) {
  const [balance, setBalance] = useState<BalanceData>({
    availableBalance: 0,
    loading: true,
    error: null,
  });

  const fetchBalance = useCallback(async () => {
    try {
      const res = await fetch("/api/account/balance");
      const json = await res.json();

      if (res.status === 401) {
        setBalance({ availableBalance: 0, loading: false, error: "login" });
        return;
      }

      if (json.code === 0 && json.data) {
        // AscendEX free margin response
        const crossFree = parseFloat(json.data.crossedFreeMargin || "0");
        setBalance({ availableBalance: crossFree, loading: false, error: null });
      } else {
        setBalance((prev) => ({ ...prev, loading: false }));
      }
    } catch {
      setBalance((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchBalance();
    const id = setInterval(fetchBalance, intervalMs);
    return () => clearInterval(id);
  }, [fetchBalance, intervalMs]);

  return balance;
}
