"use client";

import Link from "next/link";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";

const MENU_ITEMS = [
  { href: "/mypage/api-key", icon: "🔑", iconBg: "#EBF3FF", label: "API Key 등록" },
  { href: "/mypage/notification-settings", icon: "🔔", iconBg: "#FFF8EC", label: "알림 설정" },
  { href: "/mypage/announcements", icon: "📢", iconBg: "#FFF0F1", label: "공지사항" },
  { href: "/mypage/support", icon: "🎧", iconBg: "#EBF3FF", label: "고객센터" },
];

export default function MyPage() {
  return (
    <div className="min-h-dvh bg-[#F2F4F6] text-[#191F28] pb-20">
      <AppHeader title="마이페이지" />

      <main className="mx-auto max-w-lg px-4 pb-4 pt-3">
        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white">
          <div className="flex items-center gap-3.5 px-4 py-[18px]">
            <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C4DFF] to-[#9C6FFF] text-sm font-extrabold tracking-tight text-white">
              HGD
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-[#191F28]">안녕하세요, 홍길동님</p>
              <p className="mt-0.5 text-xs text-[#6B7684]">example@email.com</p>
            </div>
            <span className="shrink-0 rounded-full bg-[#E8FBF3] px-2.5 py-1 text-[11px] font-bold text-[#05C072]">
              정상
            </span>
          </div>
          <div className="mx-4 h-px bg-[#F2F4F6]" />
          <div className="flex">
            <div className="flex-1 py-3.5 text-center">
              <p className="text-[11px] text-[#6B7684]">가입일</p>
              <p className="mt-1.5 text-sm font-bold">2026.01.01</p>
            </div>
            <div className="flex-1 border-l border-[#E5E8EB] py-3.5 text-center">
              <p className="text-[11px] text-[#6B7684]">회원 등급</p>
              <p className="mt-1.5 inline-flex items-center gap-1 text-sm font-bold text-[#FFB020]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                VIP 등급
              </p>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="mt-3">
          <button
            type="button"
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] border-[1.5px] text-[15px] font-bold transition-all border-[#FFE0A0] bg-[#FFF8EC] text-[#FFB020]"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            모의투자로 전환
          </button>
          <div className="mt-[7px] flex items-center justify-center gap-[5px] text-[11px] font-medium text-[#B0B8C1]">
            <span className="size-1.5 rounded-full" style={{ background: "#05C072" }} />
            현재 실매매 모드로 운영 중입니다
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-3 overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3.5 border-b border-[#F2F4F6] px-4 py-[15px] last:border-b-0 transition-colors active:bg-[#F2F4F6]"
            >
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-[10px] text-lg"
                style={{ background: item.iconBg }}
              >
                {item.icon}
              </span>
              <span className="flex-1 text-[15px] font-semibold text-[#191F28]">{item.label}</span>
              <svg width="16" height="16" fill="none" stroke="#B0B8C1" strokeWidth="2.5" viewBox="0 0 24 24" className="shrink-0">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}
          <div className="flex items-center gap-3.5 px-4 py-[15px]">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#F2F4F6] text-lg">
              &#9881;&#65039;
            </span>
            <span className="flex-1 text-[15px] font-semibold text-[#191F28]">앱버전</span>
            <span className="text-[13px] font-medium text-[#B0B8C1]">v1.0.3</span>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-3">
          <button
            type="button"
            className="h-[50px] w-full rounded-[14px] border-[1.5px] border-[#E5E8EB] bg-white text-[15px] font-bold text-[#6B7684] transition-colors active:bg-[#F2F4F6]"
          >
            로그아웃
          </button>
        </div>

        <div className="pb-2 pt-3.5 text-center">
          <button type="button" className="text-[13px] text-[#B0B8C1] underline underline-offset-2">
            회원탈퇴
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
