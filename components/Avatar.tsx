"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  name?: string;
  initials?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = "Avatar", 
  size = 40,
  name,
  initials
}) => {
  // Generar iniciales a partir del nombre si se proporciona
  const generatedInitials = useMemo(() => {
    if (name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return initials || "";
  }, [name, initials]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login"); // Redirige a la página de inicio de sesión
  };

  const [imageError, setImageError] = useState(false);
  const imageSize = Math.max(size, 24); // Asegurar un tamaño mínimo para las iniciales
  
  // Ajustar el tamaño de fuente según el tamaño del avatar
  const fontSize = Math.max(Math.floor(size / 2.5), 12);
  
  return (
    <div className="relative">
      <div
        className="flex items-center justify-center rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#00ffff]/60 transition-all duration-200"
        style={{ width: size, height: size }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Perfil de usuario"
      >
        {src && !imageError ? (
          <Image 
            src={src} 
            alt={alt} 
            width={imageSize} 
            height={imageSize} 
            className="object-cover" 
            onError={() => setImageError(true)}
          />
        ) : (
          <div 
            className="bg-[#162B3B] flex items-center justify-center text-white font-medium w-full h-full hover:bg-[#3d8eba] transition-colors duration-200"
            style={{ fontSize: `${fontSize}px` }}
          >
            {generatedInitials}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#0a1a1a] border border-gray-700 text-white rounded-lg shadow-lg z-50 overflow-hidden">
          <ul>
            <li
              className="px-4 py-3 hover:bg-[#162B3B] hover:text-[#00ffff] cursor-pointer transition-colors duration-200"
              onClick={() => {
                router.push("/perfil");
                setIsOpen(false);
              }}
            >
              Perfil
            </li>
            <li
              className="px-4 py-3 hover:bg-[#162B3B] hover:text-[#00ffff] cursor-pointer transition-colors duration-200"
              onClick={() => {
                router.push("/configuracion");
                setIsOpen(false);
              }}
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
  );
};

export default Avatar;