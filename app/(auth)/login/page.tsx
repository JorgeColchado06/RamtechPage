"use client"
import { useState } from "react";
import Link from "next/link";

import { motion } from "framer-motion";

import Input from "@/components/ui/Input";
import { redirect } from "next/navigation";
import { loginWithCredentials } from "@/app/(auth)/actions";



export default function Login() {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    
    const result = await loginWithCredentials(formData);
    
    if (!result.success) {
      setError(result.error || "Error al iniciar sesión");
      setIsLoading(false);
    } else  {
      // Redirigir a la página de inicio
      redirect("/");
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent text-white">

      {/* Contenedor principal */}
      <motion.div 
        className="w-full max-w-md mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/5 backdrop-blur-md border border-[#00ffff]/20 rounded-2xl p-8 shadow-lg">
          {/* Encabezado */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Iniciar Sesión</h1>
            <p className="text-gray-400 text-sm">Ingresa tu correo electrónico para acceder a tu cuenta</p>
          </div>
          
          <form 
            onSubmit={handleSubmit}
          >
            {/* Campo de email */}
            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />

            {/* Campo de contraseña */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Contraseña</label>
                <Link 
                  href="/restablecer"
                  className="text-xs text-[#00ffff]/80 hover:text-[#00ffff] cursor-pointer transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                showPasswordToggle
                containerClassName="mb-0" // Eliminar el margen inferior porque ya está en el div contenedor
                labelClassName="hidden" // Ocultar la etiqueta porque ya tenemos una personalizada arriba
              />
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded-lg p-3">
                {error}
              </div>
            )}

            {/* Botón de inicio de sesión */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#224e6a] to-[#00ffff]/50 rounded-lg font-medium text-white shadow-md hover:shadow-[#00ffff]/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Cargando...</span>
                </div>
              ) : (
                "Iniciar sesión"
              )}
            </button>

            {/* Separador */}
            {/* <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-600/30"></div>
              <span className="px-3 text-sm text-gray-400">O</span>
              <div className="flex-grow h-px bg-gray-600/30"></div>
            </div> */}

            {/* Botón de Google */}
            {/* <button
              type="button"
              className="w-full py-3 px-4 bg-white/5 border border-[#00ffff]/20 rounded-lg font-medium text-white flex items-center justify-center hover:bg-white/10 transition-all duration-200"
              onClick={() => console.log("Google login")}
            >
              <FaGoogle className="mr-2" size={16} />
              Iniciar sesión con Google
            </button> */}

            {/* Enlace para registrarse */}
            {/* <div className="text-center mt-6 text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link 
                href="/register"
                className="text-[#00ffff]/80 hover:text-[#00ffff] cursor-pointer transition-colors"
              >
                Registrarse
              </Link>
            </div> */}
          </form>
        </div>
      </motion.div>
    </div>
  );
}