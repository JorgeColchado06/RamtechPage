import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import GradientBackground from "./GradientBackground";
import ScrollReset from "@/components/ScrollReset"; // Importa el nuevo componente

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <GradientBackground />
        <ScrollReset /> {/* Aquí se coloca el reset del scroll */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
