// src/components/cart.tsx
"use client";
import React, { useState, createContext, useContext, useEffect, useRef, ReactNode, useCallback } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

// --- Definición Contexto INTERNO ---
export type Plan = { id: number; name: string; price: string; period: string; };
type CartContextType = { items: Plan[]; addItem: (item: Plan) => void; removeItem: (id: number) => void; clearCart: () => void; itemCount: number; };
const CartContext = createContext<CartContextType>({ items: [], addItem: () => {}, removeItem: () => {}, clearCart: () => {}, itemCount: 0 });
export const useCart = () => useContext(CartContext);

// --- Provider INTERNO ---
interface CartProviderProps { children: ReactNode; }
export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<Plan[]>([]);
  useEffect(() => { const saved=localStorage.getItem("cartItems"); if(saved){try{const p=JSON.parse(saved);if(Array.isArray(p))setItems(p)}catch{localStorage.removeItem("cartItems")}}}, []);
  useEffect(() => { if(items.length > 0) localStorage.setItem("cartItems", JSON.stringify(items)); else localStorage.removeItem("cartItems"); }, [items]);
  const addItem = useCallback((itemToAdd: Plan) => { setItems((prev) => { const exists = prev.some(i => i.id === itemToAdd.id); if (exists) { alert(`"${itemToAdd.name}" ya está en carrito.`); return prev; } return [...prev, itemToAdd]; }); }, []);
  const removeItem = useCallback((id: number) => { setItems((prev) => prev.filter(item => item.id !== id)); }, []);
  const clearCart = useCallback(() => { setItems([]); }, []);
  const itemCount = items.length;
  const value = { items, addItem, removeItem, clearCart, itemCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// --- Componente UI ---
export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, itemCount } = useCart(); // Usa el hook INTERNO
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const toggleCart = () => setIsOpen(!isOpen);
  // Efecto Cierre Modal (Click Fuera) - Ya presente
  useEffect(() => { const handleClickOutside=(e:MouseEvent)=>{if(!isOpen||!modalRef.current||modalRef.current.contains(e.target as Node)||(cartButtonRef.current&&cartButtonRef.current.contains(e.target as Node)))return;setIsOpen(false)};if(isOpen)document.addEventListener("mousedown",handleClickOutside);return()=>document.removeEventListener("mousedown",handleClickOutside)},[isOpen]);
  const navigateTo = (path: string) => { setIsOpen(false); router.push(path); };
  const calculateTotal = () => { return items.reduce((total, item) => { const priceString = item.price?.replace(/[^0-9.]/g, '') || '0'; const price = parseFloat(priceString); return total + (isNaN(price) ? 0 : price); }, 0).toFixed(2); };

  return (
    // JSX y Clases SIN CAMBIOS (estructura de tu respuesta #53)
    <div className="relative">
      <button ref={cartButtonRef} onClick={toggleCart} className="text-white text-xl relative focus:outline-none hover:text-[#00ffff] transition-colors duration-200" aria-label={`Carrito con ${itemCount} items`} aria-haspopup="dialog" aria-expanded={isOpen}>
        <FaShoppingCart />
        {itemCount > 0 && (<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full text-[10px]" aria-hidden="true">{itemCount}</span>)}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div ref={modalRef} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50" role="dialog" aria-modal="true" aria-labelledby="cart-heading">
            <div className="p-4">
              <h2 id="cart-heading" className="text-lg font-bold text-black dark:text-white mb-4">Carrito</h2>
              {items.length > 0 ? ( <div> <ul className="space-y-4 max-h-60 overflow-y-auto pr-2"> {items.map((plan) => ( <li key={plan.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"> <div className="flex-1 mr-2"><span className="text-sm text-black dark:text-gray-300 block">{plan.name}</span><span className="text-xs text-gray-500 dark:text-gray-400">{plan.period}</span></div> <span className="text-sm font-semibold text-black dark:text-gray-300 mx-2">{plan.price}</span> <button onClick={() => removeItem(plan.id)} className="text-red-500 hover:text-red-700 text-lg leading-none p-1 -mr-1" aria-label={`Eliminar ${plan.name}`}>✕</button> </li> ))} </ul> <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center"><span className="text-sm font-medium text-black dark:text-white">Total:</span><span className="text-sm font-bold text-[#00ffff]">{calculateTotal()} $</span></div> <button className="w-full mt-4 bg-[#00ffff] text-black py-2 px-4 rounded-md hover:bg-[#00e6e6] transition font-medium" onClick={() => navigateTo('/checkout')}>Continuar compra</button> </div> ) : ( <div> <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Tu carrito está vacío.</p> <button className="w-full mt-2 border border-[#00ffff] text-[#00ffff] py-2 px-4 rounded-md hover:bg-[#00ffff]/10 transition font-medium" onClick={() => navigateTo('/planes')}>Ver planes</button> </div> )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}