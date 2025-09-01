import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uptick Demo",
  description: "BFF demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Link href={"/uptick"}>
            <header className="bg-white shadow-sm p-4">
              <div className="max-w-6xl mx-auto">Uptick Demo</div>
            </header>
          </Link>
          <div className="max-w-6xl mx-auto py-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
