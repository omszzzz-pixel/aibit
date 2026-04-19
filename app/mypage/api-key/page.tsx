"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";

export default function ApiKeyPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/api-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, apiSecret }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "등록에 실패했습니다");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/mypage"), 1500);
    } catch {
      setError("서버 연결에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#F2F4F6] text-[#191F28]">
      <AppHeader title="API Key 등록" />

      <main className="mx-auto max-w-lg px-4 pt-6 pb-10">
        {/* 안내 카드 */}
        <div className="mb-6 rounded-2xl border border-[#E5E8EB] bg-white p-5">
          <h2 className="mb-2 text-[15px] font-bold">AscendEX API Key 연동</h2>
          <div className="space-y-2 text-[13px] leading-relaxed text-[#6B7684]">
            <p>AI-BIT에서 거래를 하려면 AscendEX 거래소의 API Key를 등록해야 합니다.</p>
            <div className="rounded-xl bg-[#FFF8EC] p-3 text-[12px] text-[#B8860B]">
              <p className="font-bold">API Key 생성 시 주의사항:</p>
              <ul className="mt-1.5 list-disc pl-4 space-y-1">
                <li>AscendEX &gt; 설정 &gt; API 관리에서 생성</li>
                <li><strong>선물 거래</strong> 권한을 반드시 활성화</li>
                <li>IP 제한에 서버 IP를 등록하세요</li>
                <li>출금 권한은 절대 활성화하지 마세요</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-2xl border border-[#E5E8EB] bg-white p-5 space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="api-key" className="text-sm font-semibold text-[#191F28]">
                API Key
              </label>
              <input
                id="api-key"
                type="text"
                placeholder="API Key를 입력하세요"
                className="rounded-xl border border-[#E5E8EB] bg-[#F8F9FA] px-4 py-3.5 text-sm text-[#191F28] outline-none transition-colors focus:border-[#3182F6] focus:bg-white placeholder:text-[#B0B8C1]"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="api-secret" className="text-sm font-semibold text-[#191F28]">
                API Secret
              </label>
              <input
                id="api-secret"
                type="password"
                placeholder="API Secret을 입력하세요"
                className="rounded-xl border border-[#E5E8EB] bg-[#F8F9FA] px-4 py-3.5 text-sm text-[#191F28] outline-none transition-colors focus:border-[#3182F6] focus:bg-white placeholder:text-[#B0B8C1]"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-[#FFF0F1] px-4 py-3 text-sm font-medium text-[#F04452]">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-[#E8FBF3] px-4 py-3 text-sm font-medium text-[#05C072]">
              API Key가 등록되었습니다! 마이페이지로 이동합니다...
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !apiKey || !apiSecret}
            className="w-full rounded-2xl bg-[#3182F6] py-4 text-base font-bold text-white shadow-lg shadow-[#3182F6]/25 transition-opacity disabled:cursor-not-allowed disabled:opacity-35 enabled:active:opacity-90"
          >
            {loading ? "확인 중..." : "API Key 등록"}
          </button>
        </form>
      </main>
    </div>
  );
}
