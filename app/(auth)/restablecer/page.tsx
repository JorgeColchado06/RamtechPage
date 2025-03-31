// app/restablecer/page.tsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import GradientBackground from "@/components/GradientBackground";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Obtener token y limpiar errores
  useEffect(() => { const resetToken = searchParams.get('token'); if (resetToken) setToken(resetToken); else setError("Token inválido o no proporcionado."); }, [searchParams]);
  useEffect(() => { setError(null); setSuccessMessage(null); }, [password, confirmPassword]);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); if (!token) { setError("Token inválido."); return; } if (password !== confirmPassword) { setError("Las contraseñas no coinciden."); return; } if (password.length < 8) { setError("Mínimo 8 caracteres."); return; } setIsLoading(true); setError(null); setSuccessMessage(null); try { /* Simulación API */ await new Promise(resolve => setTimeout(resolve, 1000)); const response = { ok: token === "valid-token-123" }; const data = { message: response.ok ? "Contraseña restablecida" : "Token inválido/expirado" }; if (!response.ok) throw new Error(data.message || 'Error reseteo'); setSuccessMessage(data.message + ". Redirigiendo..."); setTimeout(() => { router.push("/login"); }, 3000); } catch (err) { setError(err instanceof Error ? err.message : "Error"); } finally { setIsLoading(false); } };

  return (
    // Mantener estructura y clases EXACTAS del GitHub commit/código base
    <div className="flex items-center justify-center min-h-screen bg-transparent text-[#f3f8fc] font-[Palanquin Dark]">
      <GradientBackground />
      <div className="absolute top-[-70px] left-6 sm:left-10"><Image src="/Página 11.svg" width={250} height={61} alt="Logo" /></div>
      <div className="absolute top-[130px] text-4xl font-bold uppercase">Restablecer Contraseña</div>
      <div className="w-[680px] h-auto min-h-[500px] bg-white dark:bg-[#000000]/95 border-1 border-transparent dark:border-[#00ffff]/40 rounded-[20px] shadow-xl p-8 flex flex-col items-center justify-center">
        {successMessage ? (
            <div className="text-center"><p className="text-green-500 text-lg mb-4">{successMessage}</p><button onClick={() => router.push('/login')} className="text-[#00ffff] hover:underline">Ir a Iniciar Sesión</button></div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6 relative">
              <label className="text-left block text-sm uppercase mb-2">Nueva Contraseña</label>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-[50px] rounded-[15px] px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f1f1f] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ffff]/60 focus:border-transparent transition-all duration-300 disabled:opacity-70" placeholder="Escribe tu nueva contraseña" required disabled={isLoading || !token}/>
              <motion.div className="absolute right-4 top-[55px] transform -translate-y-1/2 cursor-pointer" onClick={() => !isLoading && setShowPassword(!showPassword)} initial={{ scale: 1 }} whileTap={isLoading ? {} : {scale: 1.2}} transition={{ duration: 0.2 }}>{showPassword ? (<FaEyeSlash className="text-[#00ffff]/60" size={18} />) : (<FaEye className="text-[#00ffff]/60" size={18} />)}</motion.div>
            </div>
            <div className="mb-6 relative">
              <label className="text-left block text-sm uppercase mb-2">Confirmar Contraseña</label>
              <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full h-[50px] rounded-[15px] px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f1f1f] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ffff]/60 focus:border-transparent transition-all duration-300 disabled:opacity-70" placeholder="Confirma tu nueva contraseña" required disabled={isLoading || !token}/>
            </div>
            {error && (<div className="mb-4 text-center text-red-500 bg-red-100 dark:bg-red-900/30 border border-red-500 p-3 rounded-md text-sm">{error}</div>)}
            <button type="submit" className="w-full mt-4 h-[50px] bg-[rgba(0,0,0,0.25)] border border-[#224e6a] rounded-[20px] font-semibold text-white uppercase hover:bg-[#00ffff]/45 transition disabled:opacity-60 disabled:cursor-not-allowed" disabled={isLoading || !token}>{isLoading ? "Restableciendo..." : "Restablecer Contraseña"}</button>
          </form>
         )}
      </div>
    </div>
  );
}