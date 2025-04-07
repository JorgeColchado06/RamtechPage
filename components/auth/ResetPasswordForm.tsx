"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Componentes
import Stepper from "./Stepper";
import StatusMessage from "./StatusMessage";
import EmailStep from "./EmailStep";
import OtpVerificationStep from "./OtpVerificationStep";
import PasswordResetStep from "./PasswordResetStep";

const ResetPasswordForm: React.FC = () => {
  // Estados para el formulario
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  // Función para obtener el OTP completo como string
  const getOtpString = () => otpValues.join("");

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
      console.log(err)
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
      console.log(err)
      setError("Error al verificar el código. Inténtalo de nuevo.");
      setIsLoading(false);
    }
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
      console.log(err)
      setError("Error al actualizar la contraseña. Inténtalo de nuevo.");
      setIsLoading(false);
    }
  };

  // Manejar el reenvío del código
  const handleResendCode = () => {
    setCurrentStep(1);
    setOtpValues(["", "", "", "", "", ""]);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-[#00ffff]/20 rounded-2xl p-8 shadow-lg">
      {/* Indicador de pasos */}
      <Stepper currentStep={currentStep} totalSteps={3} />

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

      {/* Mensajes de estado (éxito/error) */}
      <StatusMessage success={success} error={error} />

      {/* Paso 1: Formulario de correo electrónico */}
      {currentStep === 1 && (
        <EmailStep
          email={email}
          setEmail={setEmail}
          isLoading={isLoading}
          error={error}
          success={success}
          onSubmit={handleEmailSubmit}
        />
      )}

      {/* Paso 2: Verificación OTP */}
      {currentStep === 2 && (
        <OtpVerificationStep
          otpValues={otpValues}
          setOtpValues={setOtpValues}
          email={email}
          isLoading={isLoading}
          error={error}
          success={success}
          onSubmit={handleOtpVerification}
          onBack={() => setCurrentStep(1)}
          onResend={handleResendCode}
        />
      )}

      {/* Paso 3: Nueva contraseña */}
      {currentStep === 3 && (
        <PasswordResetStep
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          isLoading={isLoading}
          error={error}
          success={success}
          onSubmit={handlePasswordReset}
          onBack={() => setCurrentStep(2)}
        />
      )}
    </div>
  );
};

export default ResetPasswordForm;