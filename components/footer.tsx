"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  // Oculta el Footer si estás en la página de login o restablecer contraseña
  if (pathname === "/login" || pathname === "/login/restablecer") {
    return null;
  }

  return (
    <div className="bg-[rgba(0,0,0,0.8)] text-[#c8e0ef] font-[Palanquin] w-full flex flex-col justify-center relative shadow-[0px_-960px_250px_rgba(61,142,186,0),0px_-614px_246px_rgba(61,142,186,0.03),0px_-346px_207px_rgba(61,142,186,0.1),0px_-154px_154px_rgba(61,142,186,0.17),0px_-38px_84px_rgba(61,142,186,0.2)]">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full max-w-[1300px] mx-auto px-6 py-8">
        {/* Logo */}
        <div className="mb-8 lg:mb-0">
          <Image
            src="Página 11.svg"
            alt="Logo"
            width={300}
            height={74}
            className="object-cover"
          />
        </div>

        {/* Secciones */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-52">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Secciones</h3>
            <ul className="space-y-4 text-base">
              <li
                className="hover:text-[#00ffff] transition cursor-pointer"
                onClick={() => router.push("/")}
              >
                Inicio
              </li>
              <li
                className="hover:text-[#00ffff] transition cursor-pointer"
                onClick={() => router.push("/manuales")}
              >
                Manuales
              </li>
              <li
                className="hover:text-[#00ffff] transition cursor-pointer"
                onClick={() => router.push("/planes")}
              >
                Planes
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-4 text-base">
              <li
                className="hover:text-[#00ffff] transition cursor-pointer"
                onClick={() => router.push("/contacto")}
              >
                Contacto
              </li>
              <li
                className="hover:text-[#00ffff] transition cursor-pointer"
                onClick={() => router.push("/faqs")}
              >
                FAQs
              </li>
              <li
                className="hover:text-[#00ffff] transition cursor-pointer"
                onClick={() => router.push("/legal")}
              >
                Legal
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 mt-8 lg:mt-12 justify-center lg:justify-end pr-0 lg:pr-10">
        <FaFacebookF
          size={40}
          className="text-white hover:text-[#3d8eba] transition cursor-pointer"
        />
        <FaInstagram
          size={40}
          className="text-white hover:text-[#3d8eba] transition cursor-pointer"
        />
        <FaLinkedinIn
          size={40}
          className="text-white hover:text-[#3d8eba] transition cursor-pointer"
        />
      </div>
    </div>
  );
}