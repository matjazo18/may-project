import "./globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { AuthProvider } from "./context/AuthContext";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Challange Yourself",
  description: "Cool way to challange yourself",
  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="fixed bottom-4 right-4 z-50 max-w-[90px]">
          <Link
            href="https://matjazo.com"
            className="flex items-center gap-1 rounded-xl bg-gray-100 px-4 py-2 text-sm font-light text-gray-700 shadow-md transition hover:bg-gray-200 hover:shadow-lg"
          >
            by matjazo
            <span className="text-[#00ff99] text-xl leading-none">.</span>
          </Link>
        </div>

        <Toaster position="top-center" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
