"use client";

import Link from "next/link";
import { useState } from "react";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";

const EXPERTS = [
  { id: "kim", name: "김경필", surname: "김", specialty: "코인 · 선물 전문", profit: "+38.2%", gradient: "from-[#3182F6] to-[#1B64DA]", bg: "linear-gradient(160deg,#1a2a4a,#2d4a7a)", live: true },
  { id: "lee", name: "이정윤", surname: "이", specialty: "주식 · 매크로 분석", profit: "+24.7%", gradient: "from-[#F04452] to-[#C8313D]", bg: "linear-gradient(160deg,#1a1a2a,#2d2d5a)", live: false },
  { id: "leenm", name: "이웃남", surname: "이", specialty: "비트코인 선물", profit: "+51.0%", gradient: "from-[#9B59B6] to-[#7D3C98]", bg: "linear-gradient(160deg,#1a1a1a,#3a3a3a)", live: true },
  { id: "kimgh", name: "김기훈", surname: "김", specialty: "알트코인 전략", profit: "+18.3%", gradient: "from-[#05C072] to-[#039956]", bg: "linear-gradient(160deg,#2a1a1a,#5a2d2d)", live: false },
  { id: "kimjin", name: "투자학교", surname: "김", specialty: "교육 · 멘토링", profit: "+29.5%", gradient: "from-[#2C3E50] to-[#1A252F]", bg: "linear-gradient(160deg,#2a1f1a,#5a3d1a)", live: false },
  { id: "parkms", name: "박민수", surname: "박", specialty: "선물 스캘핑", profit: "+42.1%", gradient: "from-[#E67E22] to-[#CA6F1E]", bg: "linear-gradient(160deg,#1a2a1a,#2d5a2d)", live: true },
  { id: "choijh", name: "최지혜", surname: "최", specialty: "리스크 관리", profit: "+15.8%", gradient: "from-[#1ABC9C] to-[#148F77]", bg: "linear-gradient(160deg,#1a1a2a,#2d2d4a)", live: false },
  { id: "sonyw", name: "손영우", surname: "손", specialty: "퀀트 전략", profit: "+33.6%", gradient: "from-[#3498DB] to-[#2980B9]", bg: "linear-gradient(160deg,#2a1a2a,#4a2d4a)", live: false },
];

export default function ExpertPage() {
  const [search, setSearch] = useState("");

  const filtered = EXPERTS.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#F2F4F6] text-[#191F28] pb-20">
      <AppHeader title="전문가" />

      {/* Hero */}
      <div className="px-5 pb-4 pt-5">
        <div className="mb-2.5 inline-flex items-center gap-[5px] rounded-full bg-[#EBF3FF] px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#3182F6]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          AI-BIT 인증 전문가
        </div>
        <h1 className="mb-1.5 text-[22px] font-extrabold leading-[1.3]">
          검증된 전문가와<br />함께 투자하세요
        </h1>
        <p className="text-[13px] leading-relaxed text-[#6B7684]">
          실력으로 증명된 마스터들의<br />실시간 전략을 구독하세요
        </p>
      </div>

      {/* Search */}
      <div className="mx-5 mb-5">
        <div className="flex h-[46px] items-center gap-2.5 rounded-xl border-[1.5px] border-[#E5E8EB] bg-white px-3.5 transition-colors focus-within:border-[#3182F6]">
          <svg width="16" height="16" fill="none" stroke="#B0B8C1" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="전문가 이름으로 검색"
            className="min-w-0 flex-1 border-none bg-transparent text-sm text-[#191F28] outline-none placeholder:text-[#B0B8C1]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between px-5 pb-3">
        <span className="text-xs font-semibold text-[#6B7684]">전체 전문가</span>
        <span className="text-[11px] text-[#B0B8C1]">{filtered.length}명</span>
      </div>

      {/* Expert Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-8">
        {filtered.map((expert) => (
          <Link
            key={expert.id}
            href={`/expert/${expert.id}`}
            className="overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white transition-transform active:scale-[.97]"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <div
                className="flex size-full flex-col items-center justify-center gap-2"
                style={{ background: expert.bg }}
              >
                <div className={`flex size-[60px] items-center justify-center rounded-full text-[22px] font-extrabold text-white bg-gradient-to-br ${expert.gradient}`}>
                  {expert.surname}
                </div>
                <span className="text-[11px] font-medium text-[#B0B8C1]">사진 준비중</span>
              </div>
              {expert.live && (
                <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/55 px-2 py-[3px] text-[10px] font-bold text-white backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-[#05C072]" />
                  LIVE
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2.5 pt-7">
                <p className="whitespace-pre-line text-lg font-extrabold leading-tight text-white drop-shadow-[0_1px_4px_rgba(0,0,0,.4)]">
                  {expert.name}
                </p>
                <p className="mt-0.5 text-[10px] font-medium text-white/75">{expert.specialty}</p>
              </div>
            </div>
            <div className="border-t border-[#E5E8EB] p-3">
              <div className="mb-2 rounded-md bg-[#F2F4F6] py-1 text-center">
                <p className="text-[11px] font-bold text-[#05C072]">{expert.profit}</p>
                <p className="text-[9px] text-[#B0B8C1]">월 수익</p>
              </div>
              <div className="flex h-9 items-center justify-center gap-[5px] rounded-lg bg-[#EBF3FF] text-xs font-bold text-[#3182F6] transition-colors hover:bg-[#daeaff]">
                오피셜 클럽 &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
