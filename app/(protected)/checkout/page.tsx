"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/components/cart";

// Utilizamos el hook useCart para obtener los planes del carrito

export default function Checkout() {
  const router = useRouter();
  const { items: plansInCart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Calcular el total
  const calculateTotal = () => {
    let total = 0;
    plansInCart.forEach((plan) => {
      // Extraer el valor numérico del precio
      const price = parseFloat(plan.price.replace("$", ""));
      total += price;
    });
    return total.toFixed(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulación de procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      // Limpiar el carrito después de completar el pago
      clearCart();
      
      // Redirección después de completar el pago
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1a1a] to-[#162B3B] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-lg text-center my-0">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Pago completado con éxito!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Gracias por tu compra. Recibirás un correo electrónico con los detalles de tu pedido.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Redirigiendo a la página principal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1a1a] to-[#162B3B] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full my-auto">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Resumen del pedido */}
          <div className="md:w-1/2 bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2">
              Resumen del pedido
            </h2>
            
            <div className="space-y-4 mb-6">
              {plansInCart.map((plan) => (
                <div key={plan.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{plan.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Suscripción mensual</p>
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{plan.price}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="font-bold text-gray-800 dark:text-gray-200">Total:</span>
              <span className="font-bold text-xl text-[#00ffff]">${calculateTotal()}/mes</span>
            </div>
          </div>
          
          {/* Formulario de pago */}
          <div className="md:w-1/2 bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2">
              Información de pago
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                />
              </div>
              
              <div className="mt-6">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Número de tarjeta
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha de expiración
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#00ffff] text-black py-3 px-4 rounded-md hover:bg-[#00e6e6] transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00ffff] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Procesando..." : "Completar pago"}
                </button>
              </div>
            </form>
            
            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="text-gray-500 dark:text-gray-400 text-sm">Métodos de pago aceptados:</div>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}