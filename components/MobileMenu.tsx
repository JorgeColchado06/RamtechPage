"use client";

import { HiMenu, HiX } from "react-icons/hi";
import NavLink from "@/components/NavLink";
import { useState } from "react";

interface MobileMenuProps {}

export default function MobileMenu({}: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* Botón del menú hamburguesa */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-white text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-[#00ffff]/60 rounded-md hover:text-[#00ffff] transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Dropdown del menú hamburguesa */}
      {menuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-[#0a1a1a] text-white shadow-lg z-40 lg:hidden border-t border-[#3d8eba]/30">
          <ul className="flex flex-col items-center space-y-2 py-3">
            <NavLink href="/">Inicio</NavLink>
            <NavLink href="/manuales">Manuales</NavLink>
            <NavLink href="/planes">Planes</NavLink>
            <NavLink href="/carrito">Carrito</NavLink>
          </ul>
        </div>
      )}
    </>
  );
}