import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-BIT",
  description: "AI-BIT 트레이딩",
  manifest: "/manifest.json",
  formatDetection: { telephone: false },
  appleWebApp: {
    title: "AI-BIT",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "theme-color": "#0033a0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-dvh font-sans overscroll-y-none overscroll-x-none">
        <div className="flex min-h-dvh w-full justify-center overscroll-y-none overscroll-x-none bg-white 2xl:bg-[var(--app-shell-bg)]">
          <div className="flex min-h-dvh w-full max-w-full flex-col overscroll-y-none overscroll-x-none 2xl:max-w-[var(--app-column-max)] 2xl:bg-white 2xl:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_20px_50px_-12px_rgba(0,0,0,0.15)]">
            <div className="flex min-h-0 flex-1 flex-col">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
