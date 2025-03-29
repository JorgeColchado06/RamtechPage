"use client";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const plansInCart = [
  { id: 1, name: "Plan Básico", price: "$9.99/mes" },
  { id: 2, name: "Plan Pro", price: "$19.99/mes" },
  { id: 3, name: "Plan Enterprise", price: "$49.99/mes" },
];

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Ícono del carrito */}
      <button
        onClick={toggleCart}
        className="text-white text-2xl relative focus:outline-none"
      >
        <FaShoppingCart />
        {/* Indicador de cantidad */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {plansInCart.length}
        </span>
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
              {plansInCart.length > 0 ? (
                <ul className="space-y-4">
                  {plansInCart.map((plan) => (
                    <li
                      key={plan.id}
                      className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
                    >
                      <span className="text-sm text-black dark:text-gray-300">
                        {plan.name}
                      </span>
                      <span className="text-sm font-semibold text-black dark:text-gray-300">
                        {plan.price}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tu carrito está vacío.
                </p>
              )}
              <button
                className="w-full mt-4 bg-[#00ffff] text-black py-2 px-4 rounded-md hover:bg-[#00e6e6] transition"
                onClick={() => alert("Procediendo al pago...")}
              >
               Continuar compra
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}