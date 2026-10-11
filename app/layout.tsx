
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রতিদিনের বাজার দর এক নজরে",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>
        <Navbar />
        <Ticker />
        <main className="main">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}