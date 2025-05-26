import "./globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { AuthProvider } from "./context/AuthContext";
import m from "@/public/M.png";
import Image from "next/image";

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
        <div className="fixed bottom-1 right-0 z-50 hidden xl:block max-w-[90px] xl:min-w-[120px]">
          <Link
            href="https://matjazo.com"
            className="flex items-center justify-center gap-1 rounded-xl bg-gray-100  py-2 text-sm font-light text-gray-700 shadow-md transition hover:bg-gray-200 hover:shadow-lg"
          >
            by matjazo
            <Image src={m} alt="m" width={20} height={20} />
          </Link>
        </div>

        <Toaster position="top-center" />
        <AuthProvider>{children}</AuthProvider>
        
      </body>
    </html>
  );
}
