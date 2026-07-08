import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ToolNovo - Free Online Tools", template: "%s | ToolNovo" },
  description: "Free online tools for everyday tasks. Word counter, password generator, QR code generator, image compressor, and many more.",
  keywords: ["free online tools", "word counter", "password generator", "QR code generator", "image compressor", "ToolNovo"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased">
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
                <span className="text-lg font-bold text-white">T</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">ToolNovo</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-sm font-medium text-gray-500 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-auto border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600">
                    <span className="text-xs font-bold text-white">T</span>
                  </div>
                  <span className="font-bold">ToolNovo</span>
                </div>
                <p className="text-sm text-gray-500">Free online tools to make your life easier. No signup required.</p>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link href="/about" className="hover:text-gray-900">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ToolNovo. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}