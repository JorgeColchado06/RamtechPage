import React, { useRef } from "react";
import { motion } from "framer-motion";

interface OtpVerificationStepProps {
  otpValues: string[];
  setOtpValues: (values: string[]) => void;
  email: string;
  isLoading: boolean;
  error: string;
  success: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onBack: () => void;
  onResend: () => void;
}

const OtpVerificationStep: React.FC<OtpVerificationStepProps> = ({
  otpValues,
  setOtpValues,
  email,
  isLoading,
  onSubmit,
  onBack,
  onResend,
}) => {
  // Referencias para los inputs de OTP
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  // Función para obtener el OTP completo como string
  const getOtpString = () => otpValues.join("");

  // Manejar cambios en los inputs de OTP
  const handleOtpChange = (index: number, value: string) => {
    // Solo permitir números
    if (value && !/^\d+$/.test(value)) return;

    // Actualizar el valor en el estado
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Si se ingresó un valor y no es el último input, mover al siguiente
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Manejar la tecla de retroceso en los inputs de OTP
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Si se presiona retroceso y el campo está vacío, mover al anterior
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Manejar pegado de OTP
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newOtpValues = [...otpValues];

    digits.forEach((digit, index) => {
      if (index < 6) newOtpValues[index] = digit;
    });

    setOtpValues(newOtpValues);

    // Mover el foco al último input con valor o al siguiente vacío
    const lastIndex = Math.min(digits.length, 5);
    otpInputRefs.current[lastIndex]?.focus();
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Código de verificación
        </label>
        <div
          className="flex gap-2 justify-between"
          onPaste={handleOtpPaste}
        >
          {otpValues.map((digit, index) => (
            <input
              key={index}
              type="text"
              ref={(el) => {
                otpInputRefs.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              className="w-12 h-12 px-0 py-0 bg-white/5 border border-[#00ffff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 transition-all duration-200 text-center text-lg"
              maxLength={1}
              inputMode="numeric"
              required
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Ingresa el código de 6 dígitos enviado a {email}
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="w-1/3 py-3 px-4 bg-white/5 border border-[#00ffff]/20 rounded-lg font-medium text-white shadow-md hover:bg-white/10 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Atrás
        </button>

        <button
          type="submit"
          className="w-2/3 py-3 px-4 bg-gradient-to-r from-[#224e6a] to-[#00ffff]/50 rounded-lg font-medium text-white shadow-md hover:shadow-[#00ffff]/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isLoading || getOtpString().length !== 6}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Verificando...</span>
            </div>
          ) : (
            "Verificar código"
          )}
        </button>
      </div>

      <div className="text-center mt-6 text-sm text-gray-400">
        ¿No recibiste el código?{" "}
        <button
          type="button"
          onClick={onResend}
          className="text-[#00ffff]/80 hover:text-[#00ffff] cursor-pointer transition-colors"
        >
          Reenviar
        </button>
      </div>
    </motion.form>
  );
};

export default OtpVerificationStep;