// app/layout.tsx
import type { Metadata } from "next";
// Asume que tus fuentes están configuradas correctamente
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import GradientBackground from "@/components/GradientBackground";
import ScrollReset from "@/components/ScrollReset";
import { CartProvider } from "@/context/CartContext"; // Ajusta ruta
import { UserProvider } from "@/context/UserContext"; // Ajusta ruta
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = { title: "Ramtech Solutions", description: "Soluciones tecnológicas." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <UserProvider>
            <Navbar />
            <GradientBackground />
            <ScrollReset />
            <main>{children}</main>
            <Footer />
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}