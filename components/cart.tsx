"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Definir el tipo para un plan
export type Plan = {
  id: number;
  name: string;
  price: string;
  period: string;
};

// Crear el contexto para el carrito
type CartContextType = {
  items: Plan[];
  addItem: (item: Plan) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);

// Proveedor del contexto del carrito
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Plan[]>([]);

  // Cargar items del localStorage al iniciar
  useEffect(() => {
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Error parsing cart items from localStorage', error);
      }
    }
  }, []);

  // Guardar items en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Plan) => {
    // Verificar si el plan ya existe en el carrito
    const exists = items.some(i => i.id === item.id);
    if (!exists) {
      setItems(prev => [...prev, item]);
    }
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Componente del carrito
export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const { removeItem } = useCart();

  return (
    <div className="relative">
      {/* Ícono del carrito */}
      <button
        onClick={toggleCart}
        className="text-white text-xl relative focus:outline-none hover:text-[#00ffff] transition-colors duration-200"
      >
        <FaShoppingCart />
        {/* Indicador de cantidad */}
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
            {items.length}
          </span>
        )}
      </button>

      {/* Modal del carrito */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50"
          >
            <div className="p-4">
              <h2 className="text-lg font-bold text-black dark:text-white mb-4">
                Carrito
              </h2>
              {items.length > 0 ? (
                <div>
                  <ul className="space-y-4 max-h-60 overflow-y-auto">
                    {items.map((plan) => (
                      <li
                        key={plan.id}
                        className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
                      >
                        <div className="flex-1">
                          <span className="text-sm text-black dark:text-gray-300 block">
                            {plan.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {plan.period}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-black dark:text-gray-300 mx-2">
                          {plan.price}
                        </span>
                        <button 
                          onClick={() => removeItem(plan.id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <span className="text-sm font-medium text-black dark:text-white">Total:</span>
                    <span className="text-sm font-bold text-[#00ffff]">
                      {items.reduce((total, item) => {
                        const price = parseFloat(item.price.replace('$', ''));
                        return total + price;
                      }, 0).toFixed(2)} $
                    </span>
                  </div>
                  <button
                    className="w-full mt-4 bg-[#00ffff] text-black py-2 px-4 rounded-md hover:bg-[#00e6e6] transition font-medium"
                    onClick={() => {
                      setIsOpen(false); // Cerrar el carrito
                      window.location.href = "/checkout"; // Redireccionar a la página de checkout
                    }}
                  >
                    Continuar compra
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Tu carrito está vacío.
                  </p>
                  <button
                    className="w-full mt-2 border border-[#00ffff] text-[#00ffff] py-2 px-4 rounded-md hover:bg-[#00ffff]/10 transition font-medium"
                    onClick={() => {
                      setIsOpen(false); // Cerrar el carrito
                      window.location.href = "/planes"; // Redireccionar a la página de planes
                    }}
                  >
                    Ver planes
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}