"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart";

export default function PricingPlans() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  // Precios para planes mensuales y anuales (con descuento del 20% anual)
  const prices = {
    monthly: {
      basic: "$9.99",
      pro: "$19.99",
      enterprise: "$49.99"
    },
    annual: {
      basic: "$95.90", // $9.99 * 12 * 0.8 (20% descuento)
      pro: "$191.90", // $19.99 * 12 * 0.8
      enterprise: "$479.90" // $49.99 * 12 * 0.8
    }
  };

  const { addItem } = useCart();

  const handleAddToCart = (planName: string, price: string, period: string) => {
    // Crear un ID único basado en el nombre del plan y el período
    const planId = planName === "Básico" ? 1 : planName === "Pro" ? 2 : 3;
    
    // Añadir el plan al carrito
    addItem({
      id: planId,
      name: `Plan ${planName}`,
      price: price,
      period: period
    });
    
    // Mostrar una notificación o feedback (opcional)
    // Por ahora simplemente mostramos un mensaje en consola
    console.log(`Plan ${planName} añadido al carrito`);
  };

  return (
    <div className="py-8 mt-6 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
      {/* Selector de período de facturación */}
      <div className="mb-16 bg-white/10 p-1 rounded-full inline-flex">
        <button
          onClick={() => setBillingPeriod("monthly")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${billingPeriod === "monthly" ? "bg-[#00ffff] text-black" : "text-white hover:text-[#00ffff]"}`}
        >
          Mensual
        </button>
        <button
          onClick={() => setBillingPeriod("annual")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${billingPeriod === "annual" ? "bg-[#00ffff] text-black" : "text-white hover:text-[#00ffff]"}`}
        >
          Anual <span className="text-xs font-bold ml-1 bg-green-500 text-white px-2 py-0.5 rounded-full">-20%</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8 lg:gap-12">
        {/* Plan Básico */}
        <Card
          title="Básico"
          description="Comienza tu viaje"
          price={prices[billingPeriod].basic}
          period={billingPeriod === "monthly" ? "/mes" : "/año"}
          benefits={[
            "Acceso limitado a herramientas",
            "Soporte básico por email",
            "1 usuario",
            "Actualizaciones mensuales",
            "Almacenamiento 5GB",
          ]}
          buttonText="Seleccionar Plan"
          className="h-[31rem] shadow-lg shadow-[#00ffff]/20 z-10 w-full lg:max-w-sm"
          onSelect={() => handleAddToCart("Básico", prices[billingPeriod].basic, billingPeriod === "monthly" ? "/mes" : "/año")}
          popular={false}
        />

        {/* Plan Pro (Central) */}
        <Card
          title="Pro"
          description="El más popular"
          price={prices[billingPeriod].pro}
          period={billingPeriod === "monthly" ? "/mes" : "/año"}
          benefits={[
            "Acceso completo a herramientas",
            "Soporte prioritario 24/7",
            "Hasta 5 usuarios",
            "Actualizaciones semanales",
            "Almacenamiento 50GB",
            "Análisis avanzados"
          ]}
          buttonText="Seleccionar Plan"
          className="h-[32rem] scale-110 shadow-lg shadow-[#00ffff]/20 z-20 w-full lg:max-w-sm"
          onSelect={() => handleAddToCart("Pro", prices[billingPeriod].pro, billingPeriod === "monthly" ? "/mes" : "/año")}
          popular={true}
        />

        {/* Plan Enterprise */}
        <Card
          title="Enterprise"
          description="Para grandes empresas"
          price={prices[billingPeriod].enterprise}
          period={billingPeriod === "monthly" ? "/mes" : "/año"}
          benefits={[
            "Acceso completo a herramientas avanzadas",
            "Soporte dedicado 24/7",
            "Usuarios ilimitados",
            "Actualizaciones en tiempo real",
            "Almacenamiento ilimitado",
            "Análisis personalizados",
          ]}
          buttonText="Seleccionar Plan"
          className="h-[31rem] shadow-lg shadow-[#00ffff]/20 z-10 w-full lg:max-w-sm"
          onSelect={() => handleAddToCart("Enterprise", prices[billingPeriod].enterprise, billingPeriod === "monthly" ? "/mes" : "/año")}
          popular={false}
        />
      </div>
    </div>
  );
}

const Card = ({
  title,
  description,
  price,
  period,
  benefits,
  buttonText,
  className,
  onSelect,
  popular,
}: {
  title: string;
  description: string;
  price: string;
  period: string;
  benefits: string[];
  buttonText: string;
  className?: string;
  onSelect: () => void;
  popular: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`border ${popular ? "border-[#00ffff]" : "border-black/[0.2] dark:border-[#00ffff]/[0.2]"} 
        bg-gradient-to-b from-[#0a1a1a]/20 to-[#00ffff]/10 
        group/canvas-card flex flex-col items-center justify-between 
        w-full mx-auto p-5 relative rounded-lg 
        transition-all duration-250 ease-in-out ${className} ${hovered ? "translate-y-[-10px] shadow-xl" : ""}
        ${popular ? "shadow-lg shadow-[#00ffff]/20" : "shadow-[#00ffff]"}`}
    >
      {/* Etiqueta de popular */}
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#00ffff] text-black text-xs font-bold py-1 px-4 rounded-full">
          Más popular
        </div>
      )}

      {/* Contenedor con espaciado vertical */}
      <div className="flex flex-col items-center space-y-6 w-full h-full">
        {/* Título del plan */}
        <h3 className="text-2xl font-bold text-black dark:text-white mt-4">{title}</h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {description}
        </p>

        {/* Precio */}
        <div className="text-center">
          <p className="text-3xl font-bold text-black dark:text-white">
            {price}
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400">{period}</span>
          </p>
        </div>

        {/* Línea divisoria */}
        <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600"></div>

        {/* Beneficios */}
        <ul className="text-sm text-gray-600 dark:text-gray-400 list-none space-y-3 w-full min-h-[180px]">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <svg className="h-5 w-5 text-[#00ffff] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón siempre visible */}
      <button 
        onClick={onSelect}
        className={`mt-auto px-6 py-2 w-full font-semibold rounded-full transition-all duration-300 shadow-md
          ${popular 
            ? "bg-[#00ffff] text-black hover:bg-[#00e6e6]" 
            : "bg-white text-black hover:bg-gray-200 dark:bg-[#0a1a1a] dark:text-white dark:hover:bg-[#162B3B] dark:border dark:border-[#00ffff]/40"}
        `}
      >
        {buttonText}
      </button>
    </motion.div>
  );
};