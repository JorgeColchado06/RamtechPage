"use client";
import { motion } from "framer-motion";
import ResetPasswordForm from "../../../components/auth/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent text-white">
      {/* Contenedor principal */}
      <motion.div
        className="w-full max-w-md mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ResetPasswordForm />
      </motion.div>
    </div>
  );
}

