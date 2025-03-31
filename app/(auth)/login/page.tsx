// app/login/page.tsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import GradientBackground from "@/components/GradientBackground";
import { useUser } from '@/context/UserContext'; // Sigue siendo útil para verificar auth y quizás loading inicial

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // *** Usar solo lo necesario del contexto ***
  const { isAuthenticated, isLoadingAuth: isContextLoading } = useUser();

  // *** Añadir estados LOCALES para carga y error del login ***
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirigir si ya está autenticado
  useEffect(() => {
      // Esperar a que la carga inicial del contexto termine antes de redirigir
      if (!isContextLoading && isAuthenticated) {
          console.log("Login Page: Usuario ya autenticado, redirigiendo a /");
          router.push("/");
      }
  }, [isContextLoading, isAuthenticated, router]);

  // Limpiar error al escribir
  useEffect(() => { if (email || password) setError(null); }, [email, password]);

  // Handler con lógica de fetch LOCAL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Usar estado local
    setError(null);
    console.log("Attempting login locally with:", { email });

    try {
      // --- SIMULACIÓN API LOCAL (POST /api/auth/login) ---
      await new Promise(resolve => setTimeout(resolve, 1000));
      let response: Response;
      if (email === "test@test.com" && password === "password") {
        response = new Response(JSON.stringify({ token: "fake-jwt-token-12345" }), { status: 200 }); // Solo devolver token
      } else {
         response = new Response(JSON.stringify({ message: "Credenciales inválidas (local fetch)" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      }
      // const response = await fetch('/api/auth/login', { method: 'POST', ... }); // EJEMPLO REAL
      // --- FIN SIMULACIÓN ---

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      // --- ÉXITO ---
      console.log("Local login successful, token received:", data.token);
      // 1. Guardar token en localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        // Opcional: guardar también el perfil si la API lo devuelve
        // localStorage.setItem('userProfile', JSON.stringify(data.user));
      }
      // 2. Redirigir. El UserContext en la siguiente página/recarga leerá el token.
      //    Idealmente, podrías forzar una recarga o llamar a una función del contexto
      //    para que re-evalúe el estado inmediatamente si es necesario.
      //    Por simplicidad, confiamos en la redirección y la carga inicial del contexto.
       router.push("/"); // Redirigir a la página principal

    } catch (err) {
      // --- ERROR ---
      console.error("Local login error:", err);
      setError(err instanceof Error ? err.message : "Error inesperado en login.");
      // Limpiar token por si acaso hubo un intento fallido previo
      localStorage.removeItem('authToken');
      localStorage.removeItem('userProfile');
    } finally {
      setIsSubmitting(false); // Usar estado local
    }
  };

  // Mostrar loader si el contexto aún está verificando token inicial O si el form está enviando
   if (isContextLoading || isSubmitting) {
       return <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1a1a] to-[#162B3B]"><p className="text-white animate-pulse">Cargando...</p></div>;
   }
   // Si ya está autenticado (y no se redirigió aún), no mostrar nada más
   if(isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1a1a] to-[#162B3B]"><p className="text-white animate-pulse">Redirigiendo...</p></div>;
   }


  return (
    // JSX con estructura y clases originales
    <div className="flex items-center justify-center min-h-screen bg-transparent text-[#f3f8fc] font-[Palanquin Dark]">
      <GradientBackground />
      {/* Logo y Título */}
      <div className="absolute top-[-70px] left-6 sm:left-10"><Image src="/Página 11.svg" width={250} height={61} alt="Logo" /></div>
      <div className="absolute top-[130px] text-4xl font-bold uppercase">¡Bienvenido!</div>
      {/* Formulario */}
      <div className="w-[680px] h-auto min-h-[500px] bg-white dark:bg-[#000000]/95 border-1 border-transparent dark:border-[#00ffff]/40 rounded-[20px] shadow-xl p-8 flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full">
          {/* Email */}
          <div className="mb-6">
            <label className="text-left block text-sm uppercase mb-2">Correo Electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-[50px] rounded-[15px] px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f1f1f] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ffff]/60 focus:border-transparent transition-all duration-300 disabled:opacity-70" placeholder="ejemplo@gmail.com" required disabled={isSubmitting}/>
          </div>
          {/* Password */}
          <div className="mb-6 relative">
            <label className="text-left block text-sm uppercase mb-2">Contraseña</label>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-[50px] rounded-[15px] px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f1f1f] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ffff]/60 focus:border-transparent transition-all duration-300 disabled:opacity-70" placeholder="Escribe tu contraseña" required disabled={isSubmitting}/>
            <motion.div className="absolute right-4 top-[55px] transform -translate-y-1/2 cursor-pointer" onClick={() => !isSubmitting && setShowPassword(!showPassword)} initial={{ scale: 1 }} whileTap={isSubmitting ? {} : {scale: 1.2}} transition={{ duration: 0.2 }}>{showPassword ? (<FaEyeSlash className="text-[#00ffff]/60" size={18} />) : (<FaEye className="text-[#00ffff]/60" size={18} />)}</motion.div>
          </div>
          {/* Olvidaste Contraseña */}
          <div className={`text-sm mb-6 text-left inline-block ${isSubmitting ? 'text-gray-500 cursor-default' : 'text-gray-100 cursor-pointer hover:underline'}`} onClick={() => !isSubmitting && router.push("/restablecer")}>¿Olvidaste tu contraseña?</div>

          {/* *** Mensaje de Error LOCAL *** */}
          {error && (<div className="mb-4 text-center text-red-500 bg-red-100 dark:bg-red-900/30 border border-red-500 p-3 rounded-md text-sm">{error}</div>)}

          {/* Botón Submit */}
          <button type="submit" className="w-full h-[50px] bg-[rgba(0,0,0,0.25)] border border-[#224e6a] rounded-[20px] font-semibold text-white uppercase hover:bg-[#00ffff]/45 transition disabled:opacity-60 disabled:cursor-not-allowed" disabled={isSubmitting}>
            {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}