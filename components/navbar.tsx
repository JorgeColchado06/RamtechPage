// src/components/navbar.tsx
"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import Cart from "@/components/cart";
import { useUser } from '@/context/UserContext'; // Importar hook UserContext

export default function Navbar() {
  // Estados locales y refs (sin cambios)
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);

  // Usar Contexto de Usuario (para iniciales y logout)
  const { initials: userInitials, logout } = useUser();

  // Navegación (sin cambios)
  const handleMenuNavigation = (path: string) => { setMenuOpen(false); setIsOpen(false); router.push(path); };

  // Cierre Menús (sin cambios)
  useEffect(() => { const handleClickOutside=(e:MouseEvent)=>{if(!menuOpen||!menuRef.current||menuRef.current.contains(e.target as Node)||(menuButtonRef.current&&menuButtonRef.current.contains(e.target as Node)))return;setMenuOpen(false)};if(menuOpen)document.addEventListener("mousedown",handleClickOutside);return()=>document.removeEventListener("mousedown",handleClickOutside)}, [menuOpen]);
  useEffect(() => { const handleClickOutsideProfile=(e:MouseEvent)=>{if(!isOpen||!profileMenuRef.current||profileMenuRef.current.contains(e.target as Node)||(profileButtonRef.current&&profileButtonRef.current.contains(e.target as Node)))return;setIsOpen(false)};if(isOpen)document.addEventListener("mousedown",handleClickOutsideProfile);return()=>document.removeEventListener("mousedown",handleClickOutsideProfile)}, [isOpen]);
  useEffect(() => { if (menuOpen) setMenuOpen(false); }, [pathname]);
  useEffect(() => { if (isOpen) setIsOpen(false); }, [pathname]);

  // Ocultar en login/reset
  if (pathname === "/login" || pathname === "/restablecer") return null;

  return (
    // JSX y Clases SIN CAMBIOS respecto a tu código base de Navbar (Respuesta #53)
    <div className="w-full h-[80px] flex items-center justify-between px-4 md:px-8 lg:px-12 shadow-[0px_10px_20px_rgba(61,142,186,0.2),0px_20px_40px_rgba(61,142,186,0.1)] bg-[#0a1a1a]/95 fixed top-0 inset-x-0 z-30">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 w-[180px]"> <Image src="/logo.svg" alt="RamTech Solutions Logo" width={180} height={45} className="object-contain cursor-pointer" onClick={() => handleMenuNavigation("/")}/> </div>
        {/* Menú Principal Desktop */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
           <nav className="flex space-x-12">
             <div className={`text-base font-semibold px-4 py-2 cursor-pointer transition-colors duration-200 ${pathname === "/" ? "text-[#E6F0F8] border-b-2 border-[#00ffff] rounded-t-md" : "text-[#fff] hover:text-[#00ffff]"}`} onClick={() => handleMenuNavigation("/")}>Inicio</div>
             <div className={`text-base font-semibold px-4 py-2 cursor-pointer transition-colors duration-200 ${pathname === "/manuales" ? "text-[#E6F0F8] border-b-2 border-[#00ffff] rounded-t-md" : "text-[#fff] hover:text-[#00ffff]"}`} onClick={() => handleMenuNavigation("/manuales")}>Manuales</div>
             <div className={`text-base font-semibold px-4 py-2 cursor-pointer transition-colors duration-200 ${pathname === "/planes" ? "text-[#E6F0F8] border-b-2 border-[#00ffff] rounded-t-md" : "text-[#fff] hover:text-[#00ffff]"}`} onClick={() => handleMenuNavigation("/planes")}>Planes</div>
           </nav>
        </div>
        {/* Iconos Derecha (Móvil) */}
        <div className="lg:hidden flex items-center">
          <div className="mr-3"><Cart /></div>
          <button ref={menuButtonRef} className="text-white text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-[#00ffff]/60 rounded-md hover:text-[#00ffff] transition-colors duration-200" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">{menuOpen ? <HiX /> : <HiMenu />}</button>
        </div>
        {/* Dropdown Menú Hamburguesa */}
        {menuOpen && (
          <div ref={menuRef} className="absolute top-[80px] left-0 w-full bg-[#0a1a1a] text-white shadow-lg z-40 lg:hidden border-t border-[#3d8eba]/30">
            <ul className="flex flex-col items-center space-y-2 py-3">
               <li className="w-full text-center py-3 cursor-pointer hover:bg-[#162B3B] hover:text-[#00ffff] transition-colors duration-200" onClick={() => handleMenuNavigation("/")}>Inicio</li>
               <li className="w-full text-center py-3 cursor-pointer hover:bg-[#162B3B] hover:text-[#00ffff] transition-colors duration-200" onClick={() => handleMenuNavigation("/manuales")}>Manuales</li>
               <li className="w-full text-center py-3 cursor-pointer hover:bg-[#162B3B] hover:text-[#00ffff] transition-colors duration-200" onClick={() => handleMenuNavigation("/planes")}>Planes</li>
               <li className="w-[90%] border-t border-[#3d8eba]/50 my-2"></li>
               {/* Opciones de usuario siempre visibles */}
               <li className="w-full text-center py-3 cursor-pointer hover:bg-[#162B3B] hover:text-[#00ffff] transition-colors duration-200" onClick={() => handleMenuNavigation("/perfil")}>Perfil</li>
               <li className="w-full text-center py-3 cursor-pointer hover:bg-[#162B3B] hover:text-[#00ffff] transition-colors duration-200" onClick={() => handleMenuNavigation("/configuracion")}>Configuración</li>
               <li className="w-full text-center py-3 cursor-pointer text-red-400 hover:bg-[#162B3B] hover:text-red-500 transition-colors duration-200" onClick={logout}>Cerrar Sesión</li> {/* Usa logout del contexto */}
             </ul>
          </div>
        )}
        {/* Iconos Derecha (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8 w-[180px] justify-end">
           <> {/* Renderizar siempre */}
             <div className="relative top-[5px]"><Cart /></div>
             <div className="relative">
               <div ref={profileButtonRef} className="w-[42px] h-[42px] bg-[#162B3B] rounded-full flex items-center justify-center text-white text-lg font-medium cursor-pointer hover:bg-[#3d8eba] transition-colors duration-200" onClick={() => setIsOpen(!isOpen)} aria-label="Perfil de usuario" aria-haspopup="true" aria-expanded={isOpen}>
                 {userInitials || '??'} {/* Usa iniciales del contexto */}
               </div>
               {isOpen && (
                 <div ref={profileMenuRef} className="absolute right-0 mt-2 w-48 bg-[#0a1a1a] border border-gray-700 text-white rounded-lg shadow-lg z-50 overflow-hidden" role="menu">
                   <ul role="none">
                     <li role="none" className="px-4 py-3 hover:bg-[#162B3B] hover:text-[#00ffff] cursor-pointer transition-colors duration-200"><button role="menuitem" className="w-full text-left" onClick={() => handleMenuNavigation("/perfil")}>Perfil</button></li>
                     <li role="none" className="px-4 py-3 hover:bg-[#162B3B] hover:text-[#00ffff] cursor-pointer transition-colors duration-200"><button role="menuitem" className="w-full text-left" onClick={() => handleMenuNavigation("/configuracion")}>Configuración</button></li>
                     <li role="none" className="px-4 py-3 hover:bg-[#162B3B] hover:text-[#00ffff] cursor-pointer transition-colors duration-200"><button role="menuitem" className="w-full text-left" onClick={logout}>Cerrar Sesión</button></li> {/* Usa logout del contexto */}
                   </ul>
                 </div>
               )}
             </div>
           </>
        </div>
      </div>
    </div>
  );
}