import React from 'react';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

// Importación de logos
import logo_1 from "@/public/logos/apple.svg";
import logo_2 from "@/public/logos/Wordpress--Streamline-Simple-Icons.svg";
import logo_3 from "@/public/logos/Asus--Streamline-Simple-Icons.svg";
import logo_4 from "@/public/logos/Republicofgamers--Streamline-Simple-Icons.svg";
import logo_5 from "@/public/logos/Valve--Streamline-Simple-Icons.svg";

// Array de logos con sus URLs
const logos = [
  { src: logo_1, url: "https://www.apple.com/" },
  { src: logo_2, url: "https://wordpress.com/" },
  { src: logo_3, url: "https://www.asus.com/" },
  { src: logo_4, url: "https://rog.asus.com/" },
  { src: logo_5, url: "https://www.valvesoftware.com/" },
];

const PartnersSection = () => {
  return (
    <section className="md:mt-20">
      <div className="flex items-center text-center justify-center mt-8">
        {/* Línea izquierda */}
        <div className="h-[1px] -mt-5 sm:mt-0 w-16 md:w-80 bg-gray-300 mx-4"></div>
        <h3 className="md:text-2xl font-semibold text-white">
          Nuestros socios son líderes de sus industrias
        </h3>
        {/* Línea derecha */}
        <div className="h-[1px] -mt-5 sm:mt-0 w-16 md:w-80 bg-gray-300 mx-4"></div>
      </div>

      <div className="mt-5 sm:mt-12 relative flex flex-col items-center justify-center overflow-hidden rouneded-[30px]">
        <InfiniteMovingCards logos={logos} direction="right" speed="normal" />
      </div>
    </section>
  );
};

export default PartnersSection;