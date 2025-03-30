"use client";
import React from "react";
import PricingPlans from "@/components/ui/PricingPlans";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";

export default function PlanesPage() {
  
  // Referencias para las animaciones de scroll
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px"
  });
  
  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px"
  });
  
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1a1a] to-[#162B3B]">
      {/* Sección de encabezado */}
      <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Planes y Precios
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-300 max-w-3xl mx-auto"
        >
          Elige el plan perfecto para tu negocio y comienza a crecer con nuestras soluciones tecnológicas
        </motion.p>
      </div>

      {/* Componente de Planes de Precios */}

      <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
        <PricingPlans />    
      </motion.div>

      {/* Sección de Características Adicionales */}
      <motion.div 
        ref={featuresRef}
        initial={{ opacity: 0, y: 30 }}
        animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-12">Todas nuestras suscripciones incluyen</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Característica 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 p-6 rounded-lg border border-[#00ffff]/20 hover:border-[#00ffff]/40 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#00ffff]/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00ffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Actualizaciones gratuitas</h3>
            <p className="text-gray-400">Recibe todas las actualizaciones y nuevas funcionalidades sin costo adicional.</p>
          </motion.div>

          {/* Característica 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 p-6 rounded-lg border border-[#00ffff]/20 hover:border-[#00ffff]/40 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#00ffff]/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00ffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Seguridad avanzada</h3>
            <p className="text-gray-400">Protección de datos y encriptación de extremo a extremo en todos nuestros servicios.</p>
          </motion.div>

          {/* Característica 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 p-6 rounded-lg border border-[#00ffff]/20 hover:border-[#00ffff]/40 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#00ffff]/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00ffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Soporte técnico</h3>
            <p className="text-gray-400">Asistencia técnica disponible para resolver cualquier problema que puedas tener.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Sección de FAQ */}
      <motion.div 
        ref={faqRef}
        initial={{ opacity: 0, y: 30 }}
        animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-12">Preguntas frecuentes</h2>
        
        <div className="space-y-8">
          {/* Pregunta 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 p-6 rounded-lg border border-[#00ffff]/20"
          >
            <h3 className="text-xl font-semibold text-white mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
            <p className="text-gray-400">Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y se ajustará el cobro de forma proporcional.</p>
          </motion.div>

          {/* Pregunta 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 p-6 rounded-lg border border-[#00ffff]/20"
          >
            <h3 className="text-xl font-semibold text-white mb-2">¿Hay algún contrato de permanencia?</h3>
            <p className="text-gray-400">No, todos nuestros planes son de pago mensual sin compromiso de permanencia. Puedes cancelar tu suscripción en cualquier momento.</p>
          </motion.div>

          {/* Pregunta 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/5 p-6 rounded-lg border border-[#00ffff]/20"
          >
            <h3 className="text-xl font-semibold text-white mb-2">¿Ofrecen descuentos para pago anual?</h3>
            <p className="text-gray-400">Sí, si eliges el pago anual obtendrás un descuento del 20% sobre el precio mensual. Contacta con nuestro equipo de ventas para más información.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Sección CTA */}
      <motion.div 
        ref={ctaRef}
        initial={{ opacity: 0, y: 30 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-16 px-4 ite sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
      >
        <div className="bg-gradient-to-r from-[#0a1a1a] to-[#162B3B] p-12 rounded-2xl border border-[#00ffff]/20">
          <h2 className="text-3xl font-bold text-white mb-4">¿Necesitas una solución personalizada?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Contacta con nuestro equipo para diseñar un plan que se adapte perfectamente a las necesidades específicas de tu empresa.</p>
          <div className="flex justify-center items-center">
          <Modal>
              {/* Botón de activación del modal */}
              <ModalTrigger className="bg-gradient-to-r from-[#224e6a]/80 to-[#3d8eba]/80 border border-[#00ffff]/30 flex items-center group relative px-20 py-5 rounded-lg overflow-hidden shadow-lg hover:shadow-[#00ffff]/20 transition-all duration-300">
                {/* El contenido ya está definido en el componente ModalTrigger */}
                <span>
               
               </span>
              </ModalTrigger>
      
              {/* Contenido del modal */}
              <ModalBody>
                <ModalContent>
                  <div className="relative mb-6">
                    <h2 className="text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3d8eba] to-[#00ffff]">
                      Ponte En Contacto
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-[#00ffff]/10 via-[#00ffff]/60 to-[#00ffff]/10 mx-auto"></div>
                  </div>
                  
                  <form className="space-y-6">
                    {/* Campo de nombre */}
                    <div className="group">
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 group-focus-within:text-[#00ffff]">
                        Nombre
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[#3d8eba]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 focus:border-transparent transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-600"
                          placeholder="Tu nombre"
                        />
                        {/* <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#3d8eba] to-[#00ffff] group-focus-within:w-full transition-all duration-300"></div> */}
                      </div>
                    </div>
      
                    {/* Campo de correo */}
                    <div className="group">
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 group-focus-within:text-[#00ffff]">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[#3d8eba]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 focus:border-transparent transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-600"
                          placeholder="ejemplo@gmail.com"
                        />
                        {/* <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#3d8eba] to-[#00ffff] group-focus-within:w-full transition-all duration-300"></div> */}
                      </div>
                    </div>
      
                    {/* Campo de mensaje */}
                    <div className="group">
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 group-focus-within:text-[#00ffff]">
                        Mensaje
                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[#3d8eba]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 focus:border-transparent transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-600"
                          rows={4}
                          placeholder="Deja tu mensaje aquí..."
                        ></textarea>
                        {/* <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#3d8eba] to-[#00ffff] group-focus-within:w-full transition-all duration-300"></div> */}
                      </div>
                    </div>
      
                    {/* Botón de envío */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#224e6a]/80 to-[#3d8eba]/80 border border-[#00ffff]/30 text-white py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-[#00ffff]/20 transition-all duration-300 mt-4 font-medium"
                    >
                      Enviar Mensaje
                    </button>
                  </form>
                </ModalContent>
              </ModalBody>
            </Modal>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}