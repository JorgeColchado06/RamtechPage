"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResetPassword() {
  // Estados para el formulario
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Referencias para los inputs de OTP
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  // Función para obtener el OTP completo como string
  const getOtpString = () => otpValues.join("");

  // Estados para el control del stepper
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  // Simular un código OTP generado (en producción esto vendría del backend)
  const [generatedOtp, setGeneratedOtp] = useState("");

  // Generar un OTP aleatorio de 6 dígitos
  const generateOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    return randomOtp;
  };

  // Manejar el envío del correo (paso 1)
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulación de envío de correo (reemplazar con llamada real a API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newOtp = generateOtp();
      console.log({ email, otp: newOtp }); // En producción, el OTP se enviaría por correo

      // Avanzar al siguiente paso
      setSuccess("Se ha enviado un código de verificación a tu correo");
      setTimeout(() => {
        setSuccess("");
        setCurrentStep(2);
        setIsLoading(false); // Mantener deshabilitado el botón hasta completar la transición
      }, 1500);
    } catch (err) {
      setError("Error al enviar el correo. Inténtalo de nuevo.");
      setIsLoading(false);
    }
  };

  // Manejar la verificación del OTP (paso 2)
  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulación de verificación (reemplazar con llamada real a API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verificar que el OTP coincida
      const otpString = getOtpString();
      if (otpString === generatedOtp) {
        // Avanzar al siguiente paso
        setSuccess("Código verificado correctamente");
        setTimeout(() => {
          setSuccess("");
          setCurrentStep(3);
          setIsLoading(false); // Mantener deshabilitado el botón hasta completar la transición
        }, 1500);
      } else {
        setError(
          "El código de verificación es incorrecto. Inténtalo de nuevo."
        );
        setIsLoading(false);
      }
    } catch (err) {
      setError("Error al verificar el código. Inténtalo de nuevo.");
      setIsLoading(false);
    }
  };

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

  // Manejar el cambio de contraseña (paso 3)
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validar que las contraseñas coincidan
      if (newPassword !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        setIsLoading(false);
        return;
      }

      // Validar longitud mínima
      if (newPassword.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        setIsLoading(false);
        return;
      }

      // Simulación de cambio de contraseña (reemplazar con llamada real a API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log({ email, newPassword });

      // Mostrar mensaje de éxito y redirigir
      setSuccess("¡Contraseña actualizada correctamente!");
      setTimeout(() => {
        router.push("/login");
        // No desactivamos isLoading porque la redirección mantendrá el botón deshabilitado
      }, 1500);
    } catch (err) {
      setError("Error al actualizar la contraseña. Inténtalo de nuevo.");
      setIsLoading(false);
    }
  };

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
          {/* Indicador de pasos */}
          <div className="flex justify-center mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step
                      ? "bg-[#00ffff]/50 text-white"
                      : currentStep > step
                      ? "bg-[#00ffff]/30 text-white"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {currentStep > step ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-10 h-1 ${
                      currentStep > step ? "bg-[#00ffff]/30" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Encabezado */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Restablecer Contraseña</h1>
            <p className="text-gray-400 text-sm">
              {currentStep === 1 &&
                "Ingresa tu correo electrónico para recibir un código de verificación"}
              {currentStep === 2 &&
                "Ingresa el código de 6 dígitos enviado a tu correo"}
              {currentStep === 3 && "Crea una nueva contraseña segura"}
            </p>
          </div>

          {/* Mensaje de éxito */}
          {success && (
            <div className="mb-4 text-sm text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-lg p-3 text-center">
              {success}
            </div>
          )}

          {/* Mensaje de error */}
          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Paso 1: Formulario de correo electrónico */}
          {currentStep === 1 && (
            <motion.form
              onSubmit={handleEmailSubmit}
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
          )}

          {/* Paso 2: Verificación OTP */}
          {currentStep === 2 && (
            <motion.form
              onSubmit={handleOtpVerification}
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
                  onClick={() => setCurrentStep(1)}
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
                  onClick={() => {
                    setCurrentStep(1);
                    setOtpValues(["", "", "", "", "", ""]);
                  }}
                  className="text-[#00ffff]/80 hover:text-[#00ffff] cursor-pointer transition-colors"
                >
                  Reenviar
                </button>
              </div>
            </motion.form>
          )}

          {/* Paso 3: Nueva contraseña */}
          {currentStep === 3 && (
            <motion.form
              onSubmit={handlePasswordReset}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 transition-all duration-200"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Mínimo 6 caracteres
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 transition-all duration-200"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-1/3 py-3 px-4 bg-white/5 border border-[#00ffff]/20 rounded-lg font-medium text-white shadow-md hover:bg-white/10 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Atrás
                </button>

                <button
                  type="submit"
                  className="w-2/3 py-3 px-4 bg-gradient-to-r from-[#224e6a] to-[#00ffff]/50 rounded-lg font-medium text-white shadow-md hover:shadow-[#00ffff]/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={
                    isLoading ||
                    newPassword.length < 6 ||
                    newPassword !== confirmPassword
                  }
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Actualizando...</span>
                    </div>
                  ) : (
                    "Actualizar contraseña"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
