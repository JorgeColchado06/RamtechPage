// src/components/ui/PricingPlans.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
// Asegúrate que la ruta al contexto del carrito es correcta
import { useCart, Plan as CartPlan } from '@/context/CartContext';

// Tipo PlanData (debe coincidir con PlanesPage y la API)
type PlanData = { id: string; name: string; description: string; prices: { monthly: string; annual: string; }; periodLabels: { monthly: string; annual: string; }; features: string[]; isFeatured?: boolean; buttonText?: string; };

// Props del componente
interface PricingPlansProps { plans: PlanData[]; }

// Función Hash (solo si CartContext usa ID numérico)
function simpleStringHash(str: string): number { let hash = 0; for (let i = 0; i < str.length; i++) { const char = str.charCodeAt(i); hash = ((hash << 5) - hash) + char; hash |= 0; } return Math.abs(hash % 1000000); }

export default function PricingPlans({ plans }: PricingPlansProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const { addItem } = useCart();

  const handleAddToCart = (plan: PlanData) => {
    const currentPrice = plan.prices?.[billingPeriod] ?? 'N/D';
    const currentPeriodLabel = plan.periodLabels?.[billingPeriod] ?? '';
    const cartItemId = `${plan.id}-${billingPeriod}`;
    const itemToAdd: CartPlan = {
      id: simpleStringHash(cartItemId), // O usa plan.id si CartContext acepta string
      name: `Plan ${plan.name} (${billingPeriod === 'monthly' ? 'Mensual' : 'Anual'})`,
      price: currentPrice,
      period: currentPeriodLabel
    };
    addItem(itemToAdd);
    alert(`${itemToAdd.name} añadido al carrito!`);
  };

  return (
     // Mantener estructura y clases EXACTAS del GitHub commit/código base
    <div className="py-8 mt-6 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
      {/* Selector de período de facturación */}
      <div className="mb-16 bg-white/10 p-1 rounded-full inline-flex">
        <button onClick={() => setBillingPeriod("monthly")} className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${billingPeriod === "monthly" ? "bg-[#00ffff] text-black" : "text-white hover:text-[#00ffff]"}`}>Mensual</button>
        <button onClick={() => setBillingPeriod("annual")} className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${billingPeriod === "annual" ? "bg-[#00ffff] text-black" : "text-white hover:text-[#00ffff]"}`}>Anual <span className="text-xs font-bold ml-1 bg-green-500 text-white px-2 py-0.5 rounded-full">-20%</span></button>
      </div>
      {/* Mapeo de Planes */}
      <div className="flex flex-col lg:flex-row items-stretch justify-center w-full gap-8 lg:gap-6 xl:gap-8">
        {/* Asegurarse que el array 'plans' existe antes de mapear */}
        {(plans || []).map((plan, index) => (
          <Card
            key={plan.id}
            title={plan.name}
            description={plan.description}
            price={plan.prices?.[billingPeriod] ?? 'N/D'}
            period={plan.periodLabels?.[billingPeriod] ?? ''}
            benefits={plan.features ?? []}
            buttonText={plan.buttonText || "Seleccionar Plan"}
            className={`w-full lg:max-w-sm ${plan.isFeatured ? 'lg:scale-105 z-20' : 'z-10'}`} // Ajustar scale/z-index
            onSelect={() => handleAddToCart(plan)}
            popular={!!plan.isFeatured}
            animationDelay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}

// --- Componente Card (Presentacional) ---
const Card = ({ title, description, price, period, benefits, buttonText, className, onSelect, popular, animationDelay = 0 }: { title: string; description: string; price: string; period: string; benefits: string[]; buttonText: string; className?: string; onSelect: () => void; popular: boolean; animationDelay?: number; }) => {
  const [hovered, setHovered] = useState(false);
  // Clases base y condicionales (SIN CAMBIOS)
  const borderClass = popular ? "border-[#00ffff]" : "border-black/[0.2] dark:border-[#00ffff]/[0.2]";
  const shadowClass = popular ? "shadow-lg shadow-[#00ffff]/20" : "shadow-md shadow-black/10 dark:shadow-[#00ffff]/10";
  const buttonClasses = `mt-auto px-6 py-2 w-full font-semibold rounded-full transition-all duration-300 shadow-md ${popular ? "bg-[#00ffff] text-black hover:bg-[#00e6e6]" : "bg-white text-black hover:bg-gray-200 dark:bg-[#0a1a1a] dark:text-white dark:hover:bg-[#162B3B] dark:border dark:border-[#00ffff]/40"}`;

  return (
    // Mantener estructura y clases EXACTAS del GitHub commit/código base
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: animationDelay }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`border ${borderClass} bg-gradient-to-b from-[#0a1a1a]/50 via-[#0a1a1a]/30 to-[#00ffff]/10 group/canvas-card flex flex-col items-center justify-between w-full mx-auto p-6 relative rounded-lg transition-all duration-300 ease-in-out ${className} ${hovered ? "translate-y-[-8px] shadow-xl" : shadowClass}`}>
      {popular && (<div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#00ffff] text-black text-xs font-bold py-1 px-4 rounded-full z-10">Más popular</div>)}
      <div className="flex flex-col items-center space-y-5 w-full h-full mt-4">
         <h3 className="text-2xl font-bold text-black dark:text-white text-center">{title}</h3>
         <p className="text-sm text-gray-600 dark:text-gray-400 text-center min-h-[40px]">{description}</p>
         <div className="text-center"><p className="text-4xl font-bold text-black dark:text-white">{price}<span className="text-sm font-normal text-gray-600 dark:text-gray-400">{period}</span></p></div>
         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ffff]/50 to-transparent my-2"></div>
         <ul className="text-sm text-gray-600 dark:text-gray-300 list-none space-y-3 w-full text-left px-2 flex-grow min-h-[160px]">
            {(benefits || []).map((benefit, idx) => ( <li key={idx} className="flex items-start"><svg className="h-5 w-5 text-[#00ffff] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span>{benefit}</span></li> ))}
         </ul>
      </div>
      <button onClick={onSelect} className={buttonClasses}>{buttonText}</button>
    </motion.div>
  );
};