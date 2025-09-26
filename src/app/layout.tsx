import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Brain, History, Home } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LectureLens - AI Lecture Summarizer",
  description: "Transform your lectures into structured notes with AI-powered summarization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed top-0 w-full z-50 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl border-b border-white/10 transition-all duration-300 hover:shadow-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2 text-white hover:text-purple-300 transition-all duration-300 group">
                <Brain className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">LectureLens</span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-1 text-white hover:text-purple-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 hover:scale-105">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
                <Link href="/history" className="flex items-center space-x-1 text-white hover:text-purple-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 hover:scale-105">
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline">History</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-16">
          {children}
        </main>
        <footer className="mt-20 border-t border-white/10 bg-gradient-to-br from-white/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-purple-300" />
                <span className="font-semibold text-white">LectureLens</span>
              </div>
              <p className="text-sm text-gray-400 text-center md:text-left">
                Transform lectures into structured notes with AI. Built with Next.js & Netlify.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <Link href="/history" className="hover:text-white transition-colors">History</Link>
              </div>
            </div>
            <div className="mt-6 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} LectureLens. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
