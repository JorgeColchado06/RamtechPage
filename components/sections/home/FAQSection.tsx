import React from 'react';
import FAQs from '@/components/faqs';
import { FaChevronRight } from 'react-icons/fa';

const FAQSection = () => {
  return (
    <section className="text-white py-20 mt-10 relative">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ffff]/5 to-transparent opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto flex flex-col md:flex-row items-start gap-12 relative z-10">
        {/* Columna izquierda: Título, descripción y formulario de contacto */}
        <div className="md:w-1/2 bg-white/5 backdrop-blur-sm border border-[#00ffff]/20 rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-[#00FFFF]">Contacta <span className="text-white">con Nosotros</span></h1>
          <p className="text-lg mb-2 text-gray-300">¿No ha encontrado lo que buscaba?</p>
          <p className="text-lg mb-6">
            <span className="text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors duration-300">
              Póngase en contacto con nosotros.
            </span>
          </p>
          

          <form className="space-y-6">
            {/* Campo de nombre */}
            <div className="group">
              <label className="block text-sm font-medium mb-2 text-gray-300 group-focus-within:text-[#00ffff] transition-colors duration-200">
                Nombre
              </label>
              <div className="relative group">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                  placeholder="Tu nombre"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00ffff]/0 to-[#00ffff]/0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Campo de correo */}
            <div className="group">
              <label className="block text-sm font-medium mb-2 text-gray-300 group-focus-within:text-[#00ffff] transition-colors duration-200">
                Correo Electrónico
              </label>
              <div className="relative group">
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                  placeholder="ejemplo@gmail.com"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00ffff]/0 to-[#00ffff]/0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Campo de mensaje */}
            <div className="group">
              <label className="block text-sm font-medium mb-2 text-gray-300 group-focus-within:text-[#00ffff] transition-colors duration-200">
                Mensaje
              </label>
              <div className="relative group">
                <textarea
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                  rows={4}
                  placeholder="Deja tu mensaje aquí..."
                ></textarea>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00ffff]/0 to-[#00ffff]/0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-[#224e6a] to-[#00ffff]/50 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-[#00ffff]/20 hover:scale-105 transition-all duration-300 mt-4 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Enviar Mensaje
                <FaChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </form>
        </div>

        {/* Columna derecha: FAQs */}
        <div className="md:w-1/2 bg-white/5 backdrop-blur-sm border border-[#00ffff]/20 rounded-xl shadow-lg">
          <FAQs />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;