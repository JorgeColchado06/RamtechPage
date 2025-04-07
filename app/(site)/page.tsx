
import React from "react";
import HeroSection from "@/components/sections/home/HeroSection";
import PartnersSection from "@/components/sections/home/PartnersSection";
import ServicesSection from "@/components/sections/home/ServicesSection";
import FAQSection from "@/components/sections/home/FAQSection";

const LandingPage = () => {
  return (
    <div className="text-gray-900 font-sans">
      {/* Sección Hero */}
      <HeroSection />

      {/* Sección de Socios */}
      <PartnersSection />

      {/* Sección de Servicios */}
      <ServicesSection />

      {/* Sección de FAQs y Contacto */}
      <FAQSection />
    </div>
  );
};

export default LandingPage;
