"use client";
import React, { useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Etiqueta del campo de entrada */
  label?: string;
  /** Mensaje de error a mostrar */
  error?: string;
  /** Texto de ayuda o descripción */
  helperText?: string;
  /** Clases CSS personalizadas para el contenedor */
  containerClassName?: string;
  /** Clases CSS personalizadas para la etiqueta */
  labelClassName?: string;
  /** Clases CSS personalizadas para el input */
  inputClassName?: string;
  /** Clases CSS personalizadas para el mensaje de error */
  errorClassName?: string;
  /** Clases CSS personalizadas para el texto de ayuda */
  helperTextClassName?: string;
  /** Mostrar icono de ojo para contraseñas */
  showPasswordToggle?: boolean;
  /** Clases CSS personalizadas para el botón de mostrar/ocultar contraseña */
  toggleButtonClassName?: string;
  /** Función para manejar el cambio de valor */
  onValueChange?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName = "mb-4",
      labelClassName = "block text-sm font-medium mb-2",
      inputClassName = "w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 transition-all duration-200",
      errorClassName = "text-sm text-red-400 mt-1",
      helperTextClassName = "text-xs text-gray-400 mt-1",
      showPasswordToggle = false,
      toggleButtonClassName = "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors",
      onValueChange,
      onChange,
      type = "text",
      ...props
    },
    ref
  ) => {
    // Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);

    // Determinar el tipo de input basado en el estado de showPassword
    const inputType = type === "password" && showPassword ? "text" : type;

    // Manejar el cambio de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Llamar al onChange original si existe
      if (onChange) {
        onChange(e);
      }
      
      // Llamar a onValueChange si existe
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    };

    return (
      <div className={containerClassName}>
        {label && <label className={labelClassName}>{label}</label>}
        
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`${inputClassName} ${error ? "border-red-500 focus:ring-red-500/40" : ""}`}
            onChange={handleChange}
            {...props}
          />
          
          {type === "password" && showPasswordToggle && (
            <button
              type="button"
              className={toggleButtonClassName}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1} // Para que no interfiera con la navegación por teclado
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          )}
        </div>
        
        {error && <p className={errorClassName}>{error}</p>}
        {helperText && <p className={helperTextClassName}>{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;