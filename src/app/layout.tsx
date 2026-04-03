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
  title: "1000Problems - Building solutions, one problem at a time",
  description: "A showcase of innovative software solutions and AI-powered tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f5f7fa] text-gray-800">
        <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-10 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-1">1000Problems</h1>
            <p className="text-[#a8b2d1] text-lg font-light">Building solutions, one problem at a time</p>
          </div>
        </header>
        <main className="flex-1 max-w-[1100px] w-full mx-auto px-6 py-8">
          {children}
        </main>
        <footer className="text-center py-6 text-gray-400 text-sm border-t border-gray-200 bg-white">
          &copy; 2026 - 1000Problems - <a href="/privacy" className="text-[#e94560] hover:underline">Privacy</a>
        </footer>
      </body>
    </html>
  );
}
