import React from 'react';
import { FaGlobe, FaCode, FaSearch, FaMobileAlt } from 'react-icons/fa';


const ServicesSection = () => {
  return (
    <section className="mt-12 py-20 text-white">
      <div className="container mx-auto flex flex-col gap-16">
        {/* Título de la sección */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Nuestros <span className="text-[#00ffff]">Servicios</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Soluciones tecnológicas a medida para impulsar tu negocio al siguiente nivel</p>
        </div>
        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Servicio 1 */}
          <div className="group bg-white/5 backdrop-blur-md border border-[#00ffff]/20 hover:border-[#00ffff]/40 rounded-xl p-6 transition-all duration-300 flex flex-col items-center text-center h-full shadow-lg hover:shadow-[#00ffff]/10">
            <div className="w-16 h-16 bg-[#00ffff]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaCode className="text-2xl text-[#00ffff]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00ffff] transition-colors duration-300">Soluciones De Software</h3>
            <p className="text-gray-300 text-sm mb-4">Desarrollo profesional del sitio web, tienda online o blog para ti.</p>
            <div className="mt-auto pt-4 border-t border-[#00ffff]/10 w-full">
              <span className="text-[#00ffff] text-xs font-medium uppercase tracking-wider">Personalizado para ti</span>
            </div>
          </div>

          {/* Servicio 2 */}
          <div className="group bg-white/5 backdrop-blur-md border border-[#00ffff]/20 hover:border-[#00ffff]/40 rounded-xl p-6 transition-all duration-300 flex flex-col items-center text-center h-full shadow-lg hover:shadow-[#00ffff]/10">
            <div className="w-16 h-16 bg-[#00ffff]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaGlobe className="text-2xl text-[#00ffff]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00ffff] transition-colors duration-300">Páginas Web</h3>
            <p className="text-gray-300 text-sm mb-4">Creamos tu proyecto a tu medida con diseños modernos y atractivos.</p>
            <div className="mt-auto pt-4 border-t border-[#00ffff]/10 w-full">
              <span className="text-[#00ffff] text-xs font-medium uppercase tracking-wider">Diseño responsive</span>
            </div>
          </div>
          
          {/* Texto descriptivo */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#00ffff]/5 to-[#00ffff]/10 backdrop-blur-md border border-[#00ffff]/20 rounded-xl p-8 flex flex-col justify-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Ayudamos a <span className="text-[#00ffff]">transformar</span>{" "}
              tu negocio
            </h2>
            <p className="text-gray-300">
              Nuestra misión es ayudar a personas y organizaciones a liberar
              su potencial creativo. Ofrecemos soluciones tecnológicas innovadoras
              que impulsan el crecimiento y la eficiencia de tu empresa.
            </p>
          </div>
        </div>
        

        {/* Segunda fila de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Texto descriptivo */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#00ffff]/10 to-[#00ffff]/5 backdrop-blur-md border border-[#00ffff]/20 rounded-xl p-8 flex flex-col justify-center shadow-lg order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4">
              Formando tu ruta hacia el{" "}
              <span className="text-[#00ffff]">triunfo</span>
            </h2>
            <p className="text-gray-300">
              Descubre ventajas exclusivas para hacer crecer tu marca y
              maximizar el marketing. Nuestras soluciones están diseñadas para
              potenciar tu presencia digital y aumentar tu visibilidad en línea.
            </p>
          </div>

          {/* Servicio 3 */}
          <div className="group bg-white/5 backdrop-blur-md border border-[#00ffff]/20 hover:border-[#00ffff]/40 rounded-xl p-6 transition-all duration-300 flex flex-col items-center text-center h-full shadow-lg hover:shadow-[#00ffff]/10 order-1 md:order-2">
            <div className="w-16 h-16 bg-[#00ffff]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaMobileAlt className="text-2xl text-[#00ffff]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00ffff] transition-colors duration-300">Optimización Para Móviles</h3>
            <p className="text-gray-300 text-sm mb-4">Sitios optimizados para móviles y tablets con experiencia de usuario excepcional.</p>
            <div className="mt-auto pt-4 border-t border-[#00ffff]/10 w-full">
              <span className="text-[#00ffff] text-xs font-medium uppercase tracking-wider">Experiencia adaptativa</span>
            </div>
          </div>

          {/* Servicio 4 */}
          <div className="group bg-white/5 backdrop-blur-md border border-[#00ffff]/20 hover:border-[#00ffff]/40 rounded-xl p-6 transition-all duration-300 flex flex-col items-center text-center h-full shadow-lg hover:shadow-[#00ffff]/10 order-1 md:order-2">
            <div className="w-16 h-16 bg-[#00ffff]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaSearch className="text-2xl text-[#00ffff]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00ffff] transition-colors duration-300">Optimización SEO</h3>
            <p className="text-gray-300 text-sm mb-4">Tu sitio será visible y bien posicionado en los motores de búsqueda.</p>
            <div className="mt-auto pt-4 border-t border-[#00ffff]/10 w-full">
              <span className="text-[#00ffff] text-xs font-medium uppercase tracking-wider">Mayor visibilidad</span>
            </div>
          </div>
        </div>
        
        {/* CTA Simple */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="flex flex-col  items-center justify-center gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">¿Listo para <span className="text-[#00ffff]">despegar</span>?</h3>
              <p className="text-gray-300">Explora nuestros planes personalizados y encuentra la solución perfecta para tu negocio.</p>
            </div>
            
            <a href="/planes" className="inline-block cursor-pointer bg-gradient-to-r from-[#224e6a] to-[#00ffff]/50 text-white py-3 px-8 rounded-lg font-medium shadow-md hover:shadow-[#00ffff]/40 hover:scale-105 transition-all duration-300 whitespace-nowrap">
              Descubre nuestros planes
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

  );
};

export default ServicesSection;