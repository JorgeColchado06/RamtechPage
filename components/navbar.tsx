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
    <div className="w-full h-[108px] flex items-center justify-between shadow-[0px_10px_20px_rgba(61,142,186,0.2),0px_20px_40px_rgba(61,142,186,0.1)] bg-[#0a1a1a]/95 fixed top-0 inset-x-0 z-30">
      {/* Logo */}
      <Image
        src="/Página 11.svg"
        alt="RamTech Solutions Logo"
        width={250}
        height={62}
        className="object-contain cursor-pointer"
        onClick={() => router.push("/")} // Redirige a la página principal al hacer clic en el logo
      />

      {/* Menú principal */}
      <div className="hidden lg:flex items-center space-x-12">
        <div
          className={`text-lg font-semibold px-16 py-2 cursor-pointer ${
            pathname === "/"
              ? "text-[#E6F0F8] border-b-3 border-[#00ffff] rounded-t-[10px]"
              : "text-[#fff] hover:text-white transition"
          }`}
          onClick={() => router.push("/")}
        >
          Inicio
        </div>
        <div
          className={`text-lg font-semibold px-16 py-2 cursor-pointer ${
            pathname === "/manuales"
              ? "text-[#E6F0F8] border-b-3 border-[#00ffff] rounded-t-[10px]"
              : "text-[#fff] hover:text-white transition"
          }`}
          onClick={() => router.push("/manuales")}
        >
          Manuales
        </div>
        <div
          className={`text-lg font-semibold px-16 py-2 cursor-pointer ${
            pathname === "/planes"
              ? "text-[#E6F0F8] border-b-3 border-[#00ffff] rounded-t-[10px]"
              : "text-[#fff] hover:text-white transition"
          }`}
          onClick={() => router.push("/planes")}
        >
          Planes
        </div>
      </div>

      {/* Menú hamburguesa para pantallas pequeñas */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Dropdown del menú hamburguesa */}
      {menuOpen && (
        <div className="absolute top-[108px] left-0 w-full bg-[#0a1a1a] text-white shadow-lg z-40 lg:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li
              className="cursor-pointer hover:text-[#00ffff]"
              onClick={() => {
                setMenuOpen(false);
                router.push("/");
              }}
            >
              Inicio
            </li>
            <li
              className="cursor-pointer hover:text-[#00ffff]"
              onClick={() => {
                setMenuOpen(false);
                router.push("/manuales");
              }}
            >
              Manuales
            </li>
            <li
              className="cursor-pointer hover:text-[#00ffff]"
              onClick={() => {
                setMenuOpen(false);
                router.push("/planes");
              }}
            >
              Planes
            </li>
            <li
              className="cursor-pointer hover:text-[#00ffff]"
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

      {/* Icono del carrito y perfil */}
      <div className="hidden lg:flex items-center space-x-8">
        {/* Reemplazamos el ícono del carrito por el componente Cart */}
        <Cart />

        {/* Dropdown del perfil */}
        <div className="relative">
          <div
            className="w-[60px] h-[60px] bg-[#162B3B] rounded-full flex items-center justify-center text-white text-[25px] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            JC
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#162B3B] text-white rounded-lg shadow-lg z-50">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-[#3d8eba] cursor-pointer"
                  onClick={() => router.push("/perfil")}
                >
                  Perfil
                </li>
                <li
                  className="px-4 py-2 hover:bg-[#3d8eba] cursor-pointer"
                  onClick={() => router.push("/configuracion")}
                >
                  Configuración
                </li>
                <li
                  className="px-4 py-2 hover:bg-[#3d8eba] cursor-pointer"
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
  );
}