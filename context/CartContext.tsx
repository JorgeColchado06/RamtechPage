// src/context/CartContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from "react";

// Tipo Plan para el carrito
export type Plan = {
  id: number;
  name: string;
  price: string;
  period: string;
};

// Tipo Contexto
type CartContextType = {
  items: Plan[];
  addItem: (item: Plan) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  itemCount: number;
};

// Contexto
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  itemCount: 0,
});

// Hook
export const useCart = () => useContext(CartContext);

// Provider
interface CartProviderProps { children: ReactNode; }
export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<Plan[]>([]);

  // Cargar de localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) { try { const parsed = JSON.parse(saved); if (Array.isArray(parsed)) setItems(parsed); else localStorage.removeItem("cartItems"); } catch { localStorage.removeItem("cartItems"); } }
  }, []);

  // Guardar en localStorage
  useEffect(() => { if (items.length > 0) localStorage.setItem("cartItems", JSON.stringify(items)); else localStorage.removeItem("cartItems"); }, [items]);

  // Funciones
  const addItem = useCallback((itemToAdd: Plan) => { setItems((prev) => { const exists = prev.some(i => i.id === itemToAdd.id); if (exists) { alert(`"${itemToAdd.name}" ya está en el carrito.`); return prev; } return [...prev, itemToAdd]; }); }, []);
  const removeItem = useCallback((id: number) => { setItems((prev) => prev.filter(item => item.id !== id)); }, []);
  const clearCart = useCallback(() => { setItems([]); }, []);
  const itemCount = items.length;
  const value = { items, addItem, removeItem, clearCart, itemCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}