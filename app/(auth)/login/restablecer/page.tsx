"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion"; // Importamos framer-motion
import GradientBackground from "@/app/GradientBackground";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log({ password });
    // Redirigir a la página de inicio de sesión después de restablecer la contraseña
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent text-[#f3f8fc] font-[Palanquin Dark]">
      <GradientBackground />
      <div className="absolute top-[-70px] left-6 sm:left-10">
        <Image src="/Página 11.svg" width={250} height={61} alt="Logo" />
      </div>

      <div className="absolute top-[130px] text-4xl font-bold uppercase">
        Restablecer Contraseña
      </div>

      <div className="w-[680px] h-[500px] bg-white dark:bg-[#000000]/95 border-1 border-transparent dark:border-[#00ffff]/40 rounded-[20px] shadow-xl p-8 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full">
          {/* Campo de nueva contraseña */}
          <div className="mb-6 relative">
            <label className="text-left block text-sm uppercase mb-2">
              Nueva Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] rounded-[15px] px-4 border border-[#fff] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ffff]/60"
              placeholder="Escribe tu nueva contraseña"
              required
            />
            <motion.div
              className="absolute right-4 top-[55px] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              initial={{ scale: 1 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              {showPassword ? (
                <FaEyeSlash className="text-[#00ffff]/60" size={18} />
              ) : (
                <FaEye className="text-[#00ffff]/60" size={18} />
              )}
            </motion.div>
          </div>

          {/* Campo de confirmación de contraseña */}
          <div className="mb-6 relative">
            <label className="text-left block text-sm uppercase mb-2">
              Confirmar Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[50px] rounded-[15px] px-4 border border-[#fff] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ffff]/60"
              placeholder="Confirma tu nueva contraseña"
              required
            />
          </div>

          {/* Botón para restablecer contraseña */}
          <button
            type="submit"
            className="w-full h-[50px] bg-[rgba(0,0,0,0.25)] border border-[#224e6a] rounded-[20px] font-semibold text-white uppercase hover:bg-[#00ffff]/45 transition"
          >
            Restablecer Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}