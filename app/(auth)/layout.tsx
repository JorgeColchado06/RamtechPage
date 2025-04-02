
import GradientBackground from "@/components/GradientBackground";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import "../globals.css";

export default function RootLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <GradientBackground />
        <div className="fixed top-6 left-6 z-20">
          <Link href="/" className="flex items-center text-white hover:text-[#00ffff] transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Regresar a la pagina principal</span>
          </Link>
        </div>
        <div className="fixed hidden md:top-40 w-full md:flex justify-center z-10">
          <Image src="/logo.svg" width={300} height={70} alt="Logo" className="drop-shadow-lg" />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}