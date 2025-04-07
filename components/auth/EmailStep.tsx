import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  error: string;
  success: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const EmailStep: React.FC<EmailStepProps> = ({
  email,
  setEmail,
  isLoading,
  onSubmit,
}) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Correo electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 transition-all duration-200"
          placeholder="correo@ejemplo.com"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-[#224e6a] to-[#00ffff]/50 rounded-lg font-medium text-white shadow-md hover:shadow-[#00ffff]/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>Enviando...</span>
          </div>
        ) : (
          "Enviar código"
        )}
      </button>

      <div className="text-center mt-6 text-sm text-gray-400">
        ¿Recordaste tu contraseña?{" "}
        <Link
          href="/login"
          className="text-[#00ffff]/80 hover:text-[#00ffff] cursor-pointer transition-colors"
        >
          Iniciar sesión
        </Link>
      </div>
    </motion.form>
  );
};

export default EmailStep;