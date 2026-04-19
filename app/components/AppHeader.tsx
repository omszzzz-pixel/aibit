"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  notificationCount?: number;
}

export default function AppHeader({
  title,
  showBack = true,
  showNotification = false,
  notificationCount = 3,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 shrink-0 border-b border-black/7 bg-white pt-[env(safe-area-inset-top)] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="mx-auto grid h-12 max-w-lg grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 sm:px-4">
        {showBack ? (
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center justify-self-start rounded-xl text-[#111827] transition-colors hover:bg-gray-100 active:bg-gray-100/80"
            aria-label="뒤로가기"
            onClick={() => router.back()}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        ) : (
          <div className="size-11 shrink-0" aria-hidden="true" />
        )}

        <div className="min-w-0 px-1 text-center">
          <h1 className="truncate text-base font-bold tracking-tight text-[#111827]">
            {title}
          </h1>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-1.5 justify-self-end">
          {showNotification ? (
            <Link
              aria-label="알림"
              className="relative isolate inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-[#374151] transition-colors hover:bg-gray-100 active:bg-gray-100/80"
              href="/notifications"
            >
              <span className="pointer-events-none flex items-center justify-center">
                <svg
                  className="size-[22px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </span>
              {notificationCount > 0 && (
                <span
                  className="pointer-events-none absolute right-1 top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#2f6ff2] px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white"
                  aria-hidden="true"
                >
                  {notificationCount}
                </span>
              )}
            </Link>
          ) : (
            <div className="size-11 shrink-0" aria-hidden="true" />
          )}
        </div>
      </div>
    </header>
  );
}
