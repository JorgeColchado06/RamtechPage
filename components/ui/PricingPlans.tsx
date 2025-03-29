"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingPlans() {
  return (
    <div className="py-20 mt-18 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-8 mx-auto px-20">
      {/* Plan Básico */}
      <Card
        title="Básico"
        description="Comienza tu viaje"
        price="$9.99/mes"
        benefits={[
          "Acceso limitado a herramientas",
          "Soporte básico",
          "1 usuario",
        ]}
        buttonText="Seleccionar Plan"
        className="h-[30rem]"
      />

      {/* Plan Pro (Central) */}
      <Card
        title="Pro"
        description="El más popular"
        price="$19.99/mes"
        benefits={[
          "Acceso completo a herramientas",
          "Soporte prioritario",
          "Hasta 5 usuarios",
        ]}
        buttonText="Seleccionar Plan"
        className="h-[35rem] scale-105 shadow-lg"
      />

      {/* Plan Enterprise */}
      <Card
        title="Enterprise"
        description="Para grandes empresas"
        price="$49.99/mes"
        benefits={[
          "Acceso completo a herramientas avanzadas",
          "Soporte dedicado",
          "Usuarios ilimitados",
        ]}
        buttonText="Seleccionar Plan"
        className="h-[30rem]"
      />
    </div>
  );
}

const Card = ({
  title,
  description,
  price,
  benefits,
  buttonText,
  className,
}: {
  title: string;
  description: string;
  price: string;
  benefits: string[];
  buttonText: string;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`border border-black/[0.2] bg-gradient-to-b from-[#0a1a1a]/20 to-[#00ffff]/10 dark:border-[#00ffff]/[0.2] shadow-[#00ffff] group/canvas-card flex flex-col items-center justify-center max-w-sm w-full mx-auto p-6 relative rounded-lg transition-all duration-250 ease-in-out ${className} ${
        hovered ? "translate-y-[-10px] shadow-xl" : ""
      }`}
    >
      {/* Contenedor con espaciado vertical */}
      <div className="flex flex-col items-center space-y-6">
        {/* Título del plan */}
        <h3 className="text-2xl font-bold text-black dark:text-white">{title}</h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {description}
        </p>

        {/* Precio */}
        <p className="text-xl font-semibold text-black dark:text-white">
          {price}
        </p>

        {/* Línea divisoria */}
        <div className="w-[250px] h-[1px] bg-gray-300 dark:bg-gray-600"></div>

        {/* Beneficios */}
        <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
          {benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
      </div>

      {/* Botón */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6"
          >
            <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 shadow-lg">
              {buttonText}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};