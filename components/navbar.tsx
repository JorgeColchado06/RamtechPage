"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi"; // Iconos para el menú hamburguesa
import Cart from "@/components/cart"; // Importamos el componente Cart

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para el dropdown del perfil
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú hamburguesa
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push("/login"); // Redirige a la página de inicio de sesión
  };

  // Oculta el Navbar si estás en la página de login
  if (pathname === "/login" || pathname === "/login/restablecer") {
    return null;
  }

  return (
    <div className="w-full h-[80px] flex items-center justify-between px-4 md:px-8 lg:px-12 shadow-[0px_10px_20px_rgba(61,142,186,0.2),0px_20px_40px_rgba(61,142,186,0.1)] bg-[#0a1a1a]/95 fixed top-0 inset-x-0 z-30">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - reducido el tamaño y ajustado el flex-basis */}
        <div className="flex-shrink-0 w-[180px]">
          <Image
            src="/logo.svg"
            alt="RamTech Solutions Logo"
            width={180}
            height={45}
            className="object-contain cursor-pointer"
            onClick={() => router.push("/")} // Redirige a la página principal al hacer clic en el logo
          />
        </div>

        {/* Menú principal - mejorado el centrado y la distribución */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <nav className="flex space-x-12">
            <div
              className={`text-base font-semibold px-4 py-2 cursor-pointer transition-colors duration-200 ${
                pathname === "/"
                  ? "text-[#E6F0F8] border-b-2 border-[#00ffff] rounded-t-md"
                  : "text-[#fff] hover:text-[#00ffff]"
              }`}
              onClick={() => router.push("/")}
            >
              Inicio
            </div>
            <div
              className={`text-base font-semibold px-4 py-2 cursor-pointer transition-colors duration-200 ${
                pathname === "/manuales"
                  ? "text-[#E6F0F8] border-b-2 border-[#00ffff] rounded-t-md"
                  : "text-[#fff] hover:text-[#00ffff]"
              }`}
              onClick={() => router.push("/manuales")}
            >
              Manuales
            </div>
            <div
              className={`text-base font-semibold px-4 py-2 cursor-pointer transition-colors duration-200 ${
                pathname === "/planes"
                  ? "text-[#E6F0F8] border-b-2 border-[#00ffff] rounded-t-md"
                  : "text-[#fff] hover:text-[#00ffff]"
              }`}
              onClick={() => router.push("/planes")}
            >
              Planes
            </div>
          </nav>
        </div>

      {/* Menú hamburguesa para pantallas pequeñas */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-white text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-[#00ffff]/60 rounded-md hover:text-[#00ffff] transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Dropdown del menú hamburguesa - mejorado el estilo */}
      {menuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-[#0a1a1a] text-white shadow-lg z-40 lg:hidden border-t border-[#3d8eba]/30">
          <ul className="flex flex-col items-center space-y-2 py-3">
            <li
              className="w-full text-center py-3 cursor-pointer hover:bg-[#162B3B] hover:text-[#00ffff] transition-colors duration-200"
              onClick={() => {
                setMenuOpen(false);
                router.push("/");
              }}
            >
              Inicio
            </li>
            <li
              className="w-full text-center py-3 cursor-pointer hover:bg-[#162B3B] hover:text-[#00ffff] transition-colors duration-200"
              onClick={() => {
                setMenuOpen(false);
                router.push("/manuales");
              }}
            >
              Manuales
            </li>
            <li
              className="w-full text-center py-3 cursor-pointer hover:bg-[#162B3B] hover:text-[#00ffff] transition-colors duration-200"
              onClick={() => {
                setMenuOpen(false);
                router.push("/planes");
              }}
            >
              Planes
            </li>
            <li
              className="w-full text-center py-3 cursor-pointer hover:bg-[#162B3B] hover:text-[#00ffff] transition-colors duration-200"
              onClick={() => {
                setMenuOpen(false);
                router.push("/carrito");
              }}
            >
              Carrito
            </li>
          </ul>
        </div>
      )}

      {/* Icono del carrito y perfil - ajustado el espacio y tamaño */}
      <div className="hidden lg:flex items-center space-x-8 w-[180px] justify-end">
        {/* Reemplazamos el ícono del carrito por el componente Cart, asegurando alineación vertical */}
        <div className="relative top-[5px]">
          <Cart />
        </div>

        {/* Dropdown del perfil */}
        <div className="relative">
          <div
            className="w-[42px] h-[42px] bg-[#162B3B] rounded-full flex items-center justify-center text-white text-lg font-medium cursor-pointer hover:bg-[#3d8eba] transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Perfil de usuario"
          >
            JC
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#0a1a1a] border border-gray-700 text-white rounded-lg shadow-lg z-50 overflow-hidden">
              <ul>
                <li
                  className="px-4 py-3 hover:bg-[#162B3B] hover:text-[#00ffff] cursor-pointer transition-colors duration-200"
                  onClick={() => router.push("/perfil")}
                >
                  Perfil
                </li>
                <li
                  className="px-4 py-3 hover:bg-[#162B3B] hover:text-[#00ffff] cursor-pointer transition-colors duration-200"
                  onClick={() => router.push("/configuracion")}
                >
                  Configuración
                </li>
                <li
                  className="px-4 py-3 hover:bg-[#162B3B] hover:text-[#00ffff] cursor-pointer transition-colors duration-200"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}