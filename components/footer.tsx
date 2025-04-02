

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {

  return (
    <footer className="bg-[rgba(0,0,0,0.9)] text-[#c8e0ef] font-[Palanquin] w-full relative shadow-[0px_-960px_250px_rgba(61,142,186,0),0px_-614px_246px_rgba(61,142,186,0.03),0px_-346px_207px_rgba(61,142,186,0.1),0px_-154px_154px_rgba(61,142,186,0.17),0px_-38px_84px_rgba(61,142,186,0.2)]">
      {/* Borde superior decorativo */}
      <div className="h-1 w-full bg-gradient-to-r from-[#00ffff]/10 via-[#00ffff]/60 to-[#00ffff]/10"></div>
      
      <div className="max-w-[1300px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo y descripción */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={220}
              height={54}
              className="object-cover mb-4"
            />
            <p className="text-[#c8e0ef]/80 text-sm mt-4 max-w-xs text-center md:text-left">
              Soluciones tecnológicas avanzadas para empresas y profesionales. Innovación y calidad en cada servicio.
            </p>
          </div>

          {/* Secciones */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5 border-b border-[#00ffff]/20 pb-2 inline-block">Secciones</h3>
            <ul className="space-y-3 text-base">
              <li className="hover:text-[#00ffff] transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <Link href="/" className="flex items-center gap-2">
                  <span className="w-0 h-[1px] bg-[#00ffff] group-hover:w-3 transition-all duration-300"></span>
                  Inicio
                </Link>
              </li>
              <li className="hover:text-[#00ffff] transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <Link href="/manuales" className="flex items-center gap-2">
                  <span className="w-0 h-[1px] bg-[#00ffff] group-hover:w-3 transition-all duration-300"></span>
                  Manuales
                </Link>
              </li>
              <li className="hover:text-[#00ffff] transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <Link href="/planes" className="flex items-center gap-2">
                  <span className="w-0 h-[1px] bg-[#00ffff] group-hover:w-3 transition-all duration-300"></span>
                  Planes
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5 border-b border-[#00ffff]/20 pb-2 inline-block">Información</h3>
            <ul className="space-y-3 text-base">
              <li className="hover:text-[#00ffff] transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <Link href="/contacto" className="flex items-center gap-2">
                  <span className="w-0 h-[1px] bg-[#00ffff] group-hover:w-3 transition-all duration-300"></span>
                  Contacto
                </Link>
              </li>
              <li className="hover:text-[#00ffff] transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <Link href="/faqs" className="flex items-center gap-2">
                  <span className="w-0 h-[1px] bg-[#00ffff] group-hover:w-3 transition-all duration-300"></span>
                  FAQs
                </Link>
              </li>
              <li className="hover:text-[#00ffff] transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <Link href="/legal" className="flex items-center gap-2">
                  <span className="w-0 h-[1px] bg-[#00ffff] group-hover:w-3 transition-all duration-300"></span>
                  Legal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto y Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5 border-b border-[#00ffff]/20 pb-2 inline-block">Contáctanos</h3>
            <ul className="space-y-3 text-base">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#00ffff]/70" />
                <span>Ciudad de México, Mexico</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#00ffff]/70" />
                <span>+34 912 345 678</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#00ffff]/70" />
                <span>info@ramtech.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <NewsletterForm />
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center mt-10 pt-8 border-t border-[#3d8eba]/20">
          <div className="flex gap-5">
            <a href="#" className="group">
              <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:bg-[#00ffff]/20 transition-all duration-300">
                <FaFacebookF
                  size={18}
                  className="text-white group-hover:text-[#00ffff] transition-all duration-300"
                />
              </div>
            </a>
            <a href="#" className="group">
              <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:bg-[#00ffff]/20 transition-all duration-300">
                <FaInstagram
                  size={18}
                  className="text-white group-hover:text-[#00ffff] transition-all duration-300"
                />
              </div>
            </a>
            <a href="#" className="group">
              <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:bg-[#00ffff]/20 transition-all duration-300">
                <FaLinkedinIn
                  size={18}
                  className="text-white group-hover:text-[#00ffff] transition-all duration-300"
                />
              </div>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-[#c8e0ef]/60 text-sm mt-8">
          © {new Date().getFullYear()} Ramtech. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}