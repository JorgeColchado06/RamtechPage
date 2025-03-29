"use client";
import React from "react";
import { FaGlobe, FaCode, FaSearch, FaMobileAlt } from 'react-icons/fa'; // Importa los iconos necesarios
import FAQs from '@/components/faqs';
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"; // Importa BentoGrid y BentoGridItem
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TextGenerateEffect1 } from "@/components/ui/text-generate-effect1";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";


const words1 = "Haz crecer tu negocio con"
;
const words = "Ramtech Solutions"
;



import logo_1 from "@/public/logos/apple.svg"
import logo_2 from "@/public/logos/Wordpress--Streamline-Simple-Icons.svg"
import logo_3 from "@/public/logos/Asus--Streamline-Simple-Icons.svg"
import logo_4 from "@/public/logos/Republicofgamers--Streamline-Simple-Icons.svg"
import logo_5 from "@/public/logos/Valve--Streamline-Simple-Icons.svg"
//
const logo = [
  {src: logo_1, url: 'https://www.apple.com/'},
  {src: logo_2, url: 'https://wordpress.com/'},
  {src: logo_3, url: 'https://www.asus.com/'},
  {src: logo_4, url: 'https://rog.asus.com/'},
  {src: logo_5, url: 'https://www.valvesoftware.com/'},
]

const image = [
  { src: "/fotos/adem-ay-Tk9m_HP4rgQ-unsplash.webp" },
  { src: "/fotos/arpad-czapp-9i5zipnKJ14-unsplash.webp" },
  { src: "/fotos/campaign-creators-iEiUITs149M-unsplash.webp" },
  { src: "/fotos/christina-wocintechchat-com-8S6BkMGaLyQ-unsplash.webp" },
  { src: "/fotos/christina-wocintechchat-com-PbUShBsiwZI-unsplash.webp" },
  { src: "/fotos/christina-wocintechchat-com-bVNKEw62dFI-unsplash.webp" },
  { src: "/fotos/christopher-gower-m_HRfLhgABo-unsplash.webp" },
  { src: "/fotos/flipsnack-cQKceh3huwY-unsplash.webp" },
  { src: "/fotos/ilya-pavlov-OqtafYT5kTw-unsplash.webp" },
  { src: "/fotos/jefferson-santos-9SoCnyQmkzI-unsplash.webp" },
  { src: "/fotos/jj-ying-8bghKxNU1j0-unsplash.webp" },
  { src: "/fotos/keepcoding-lVF2HLzjopw-unsplash.webp" },
  { src: "/fotos/mika-baumeister-J5yoGZLdpSI-unsplash.webp" },
  { src: "/fotos/luke-chesser-JKUTrJ4vK00-unsplash.webp" },
  { src: "/fotos/markus-spiske-Skf7HxARcoc-unsplash.webp" },
  { src: "/fotos/adem-ay-Tk9m_HP4rgQ-unsplash.webp" },
  { src: "/fotos/arpad-czapp-9i5zipnKJ14-unsplash.webp" },
  { src: "/fotos/campaign-creators-iEiUITs149M-unsplash.webp" },
  { src: "/fotos/christina-wocintechchat-com-8S6BkMGaLyQ-unsplash.webp" },
  { src: "/fotos/christina-wocintechchat-com-PbUShBsiwZI-unsplash.webp" },
  { src: "/fotos/christina-wocintechchat-com-bVNKEw62dFI-unsplash.webp" },
  { src: "/fotos/christopher-gower-m_HRfLhgABo-unsplash.webp" },
  { src: "/fotos/flipsnack-cQKceh3huwY-unsplash.webp" },
  { src: "/fotos/ilya-pavlov-OqtafYT5kTw-unsplash.webp" },
  { src: "/fotos/jefferson-santos-9SoCnyQmkzI-unsplash.webp" },
  { src: "/fotos/jj-ying-8bghKxNU1j0-unsplash.webp" },
  { src: "/fotos/keepcoding-lVF2HLzjopw-unsplash.webp" },
  { src: "/fotos/mika-baumeister-J5yoGZLdpSI-unsplash.webp" },
  { src: "/fotos/luke-chesser-JKUTrJ4vK00-unsplash.webp" },
  { src: "/fotos/markus-spiske-Skf7HxARcoc-unsplash.webp" },
];


const LandingPage = () => {
  return (
    <div className="text-gray-900 font-sans">
{/* Sección Hero */}
    <div className="relative mx-auto my-10 flex h-screen w-full max-w-full flex-col items-center justify-center overflow-hidden rounded-3xl">
        <TextGenerateEffect1 words1={words1} />

        <TextGenerateEffect words={words} />

        <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-2xl text-gray-200">
      Potenciamos tu éxito con soluciones SaaS de vanguardia diseñadas para la escalabilidad, la eficiencia y el crecimiento.
      </p>
      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={image.map((img) => img.src)} // Extraer solo los valores de 'src'
        />
    </div>

{/* Línea de texto con líneas a los lados */
}
<section className='mt-22'>
<div className="flex items-center justify-center mt-8">
  <div className="h-[1px] w-80 bg-gray-300 mx-4"></div> {/* Línea izquierda */}
  <h3 className="text-2xl font-semibold text-white">
    Nuestros socios son líderes de sus industrias
  </h3>
  <div className="h-[1px] w-80 bg-gray-300 mx-4"></div> {/* Línea derecha */}
</div>

<div className="mt-12 relative flex flex-col items-center justify-center overflow-hidden rouneded-[30px]">
      <InfiniteMovingCards
        logos={logo}
        direction="right"
        speed="normal"
      />
    </div>
</section>

<section className="mt-12 py-20 text-white">
  <div className="container mx-auto flex flex-col gap-16">
    {/* Primera fila: Cards a la izquierda, texto a la derecha */}
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
      {/* Cards con animación */}
      <BentoGrid className="gap-8 flex flex-wrap justify-center">
        <BentoGridItem
          title="Soluciones De Software"
          description="Desarrollo profesional del sitio web, tienda online o blog para ti."
          icon={
            <div className="w-20 h-20 bg-[rgba(61,142,186,0.25)] rounded-full flex items-center justify-center mx-auto">
              <FaCode className="text-4xl text-white" />
            </div>
          }
          className="bg-[rgba(0,0,0,0.4)] p-10 rounded-xl shadow-lg text-center border border-[#3d8eba] w-[300px] h-[300px]"
        />
        <BentoGridItem
          title="Páginas Web"
          description="Creamos tu proyecto a tu medida."
          icon={
            <div className="w-20 h-20 bg-[rgba(61,142,186,0.25)] rounded-full flex items-center justify-center mx-auto">
              <FaGlobe className="text-4xl text-white" />
            </div>
          }
          className="bg-[rgba(0,0,0,0.4)] p-10 rounded-xl shadow-lg text-center border border-[#3d8eba] w-[300px] h-[300px]"
        />
      </BentoGrid>
      {/* Texto */}
      <div className="max-w-md text-center lg:text-left">
        <h2 className="text-3xl font-bold">
          Ayudamos a <span className="text-[#00ffff]">transformar</span> tu negocio
        </h2>
        <p className="mt-4 text-sm">
          Nuestra misión es ayudar a personas y organizaciones a liberar su potencial creativo.
        </p>
      </div>
    </div>

    {/* Segunda fila: Texto a la izquierda, cards a la derecha */}
    <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-8 mt-16">
      {/* Texto */}
      <div className="max-w-md text-center lg:text-left">
        <h2 className="text-3xl font-bold">
          Formando tu ruta hacia el <span className="text-[#00ffff]">triunfo</span>
        </h2>
        <p className="mt-4 text-sm">
          Descubra ventajas exclusivas para hacer crecer su marca y maximizar el marketing.
        </p>
      </div>
      {/* Cards con animación */}
      <BentoGrid className="gap-8 flex flex-wrap justify-center">
        <BentoGridItem
          title="Optimización Para Móviles"
          description="Sitios optimizados para móviles y tablets."
          icon={
            <div className="w-20 h-20 bg-[rgba(61,142,186,0.25)] rounded-full flex items-center justify-center mx-auto">
              <FaMobileAlt className="text-4xl text-white" />
            </div>
          }
          className="bg-[rgba(0,0,0,0.4)] p-10 rounded-xl shadow-lg text-center border border-[#3d8eba] w-[300px] h-[300px]"
        />
        <BentoGridItem
          title="Optimización SEO"
          description="Tu sitio será visible y bien posicionado."
          icon={
            <div className="w-20 h-20 bg-[rgba(61,142,186,0.25)] rounded-full flex items-center justify-center mx-auto">
              <FaSearch className="text-4xl text-white" />
            </div>
          }
          className="bg-[rgba(0,0,0,0.4)] p-10 rounded-xl shadow-lg text-center border border-[#3d8eba] w-[300px] h-[300px]"
        />
      </BentoGrid>
    </div>
  </div>
</section>

{/* Sección de contacto */}
<section className="text-white py-20 mt-10">
  <div className="container mx-auto flex flex-col md:flex-row items-start gap-12">
    {/* Columna izquierda: Título, descripción y botón */}
    <div className="md:w-1/2">
    <h1 className="text-4xl font-bold mb-4">Preguntas Frecuentes</h1>
  <p className="text-lg mb-2">¿No ha encontrado lo que buscaba?</p>
  <p className="text-lg mb-6">
    <span className="text-[#00FFFF]">Póngase en contacto con nosotros.</span>
  </p>
      <Modal>
              {/* Botón de activación del modal */}
              <ModalTrigger className="bg-[rgba(0,0,0,0.25)] border border-[#224e6a] flex items-center group relative px-25 py-6 rounded-lg overflow-hidden">
                <span>
               
                </span>
      
              </ModalTrigger>
      
              {/* Contenido del modal */}
              <ModalBody>
                <ModalContent>
                  <h2 className="text-3xl font-bold mb-4 text-center">
                    Ponte En Contacto
                  </h2>
                  <form className="space-y-6">
                    {/* Campo de nombre */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40"
                        placeholder="tu nombre"
                      />
                    </div>
      
                    {/* Campo de correo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40"
                        placeholder="ejemplo@gmail.com"
                      />
                    </div>
      
                    {/* Campo de mensaje */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mensaje
                      </label>
                      <textarea
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40"
                        rows={4}
                        placeholder="deja tu mensaje aquí..."
                      ></textarea>
                    </div>
      
                    {/* Botón de envío */}
                    <button
                      type="submit"
                      className="w-full bg-transparent border-1 text-white py-2 px-4 rounded-md hover:border-[#00ffff]/40 transition"
                    >
                      Send Message
                    </button>
                  </form>
                </ModalContent>
              </ModalBody>
            </Modal>
    </div>

    {/* Columna derecha: FAQs */}
    <div>
      <FAQs />
    </div>
  </div>
</section>

    </div>
  );
};

export default LandingPage;