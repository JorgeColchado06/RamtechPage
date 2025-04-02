import Image from "next/image";
import Cart from "@/components/cart"; // Importamos el componente Cart
import NavLink from "@/components/NavLink";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu"; // Importamos el componente MobileMenu

export default function Navbar() {


  
  return (
    <div className="w-full h-[80px] flex items-center justify-between px-4 md:px-8 lg:px-12 shadow-[0px_10px_20px_rgba(61,142,186,0.2),0px_20px_40px_rgba(61,142,186,0.1)] bg-[#0a1a1a]/95 fixed top-0 inset-x-0 z-30">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - reducido el tamaño y ajustado el flex-basis */}
        <div className="flex-shrink-0 w-[180px]">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="RamTech Solutions Logo"
              width={180}
              height={45}
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Menú principal - mejorado el centrado y la distribución */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <nav className="flex space-x-12">
            <NavLink href="/">Inicio</NavLink>
            <NavLink href="/manuales">Manuales</NavLink>
            <NavLink href="/planes">Planes</NavLink>
          </nav>
        </div>

      {/* Componente MobileMenu para pantallas pequeñas */}
      <MobileMenu />

      {/* Icono del carrito y perfil - ajustado el espacio y tamaño */}
      <div className="hidden lg:flex items-center space-x-8 w-[180px] justify-end">
        {/* Componente Cart para el carrito de compras */}
        <div className="relative top-[5px]">
          <Cart />
        </div>

        {/* Avatar del usuario con funcionalidad de dropdown integrada */}
        <Avatar 
          src="/path/to/user/image.jpg" 
          alt="Usuario" 
          size={42}
          name="Jorge Colchado"
        />
      </div>
    </div>
    </div>
  );
}