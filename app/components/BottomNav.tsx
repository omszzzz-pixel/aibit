"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/home", label: "홈" },
  { href: "/expert", label: "전문가" },
  { href: "/community", label: "커뮤니티" },
  { href: "/mypage", label: "마이페이지" },
] as const;

function NavTabs() {
  const pathname = usePathname();

  return (
    <nav
      className="flex min-h-[3.75rem] items-stretch gap-2 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2.5 sm:gap-3 sm:px-4"
      aria-label="메인 탭"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex min-h-12 flex-1 items-center justify-center rounded-xl text-[13px] font-bold transition-colors sm:text-[15px] ${
              active
                ? "bg-[#2f6ff2]/12 text-[#2f6ff2]"
                : "text-[#6b7280] hover:bg-black/[0.04] hover:text-[#374151]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function BottomNav({ inline }: { inline?: boolean }) {
  if (inline) {
    return <NavTabs />;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center">
      <div className="pointer-events-auto w-full max-w-full border-t border-[#e5e7eb] bg-white/95 shadow-[0_-6px_24px_rgba(0,0,0,0.06)] backdrop-blur-md 2xl:max-w-[var(--app-column-max)]">
        <NavTabs />
      </div>
    </div>
  );
}
