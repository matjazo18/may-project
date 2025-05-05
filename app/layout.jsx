import "./globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

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
        <Header />
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
