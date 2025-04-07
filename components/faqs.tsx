"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const faqs = [
  {
    question: "¿Cómo puedo crear una cuenta?",
    answer:
      "Para crear una cuenta, debes comunicarte con el soporte técnico de RamTech Solutions.",
  },
  {
    question: "¿Puedo cambiar mi contraseña?",
    answer:
      "Sí, puedes cambiar tu contraseña desde la configuración de tu perfil en la página de cliente.",
  },
  {
    question: "¿Qué hacer si olvidé mi contraseña?",
    answer:
      "Puedes solicitar un restablecimiento de contraseña en la página de inicio de sesión.",
  },
  {
    question: "¿Cómo contacto al soporte?",
    answer:
      "Puedes contactar al soporte a través del chat en línea o enviando un correo a soporte@ramtech.com.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-8 font-[Planquin Dark]">
      <h2 className="text-4xl font-bold mb-4 text-start">
        Preguntas <span className="text-[#00ffff]">frecuentes</span>
      </h2>
      <p className="text-start text-gray-300 mb-8">
        Encuentra respuestas a las consultas más comunes sobre nuestros
        servicios
      </p>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-white/5 backdrop-blur-sm border border-[#00ffff]/20 hover:border-[#00ffff]/40 rounded-xl p-6 transition-all duration-300 cursor-pointer ${
              openIndex === index ? "shadow-lg shadow-[#00ffff]/20" : ""
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center w-full text-xl font-semibold group">
              <span
                className={`transition-colors duration-300 ${
                  openIndex === index ? "text-[#00ffff]" : "text-white"
                }`}
              >
                {faq.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index ? "bg-[#00ffff]/20" : "bg-white/10"
                }`}
              >
                <Icon
                  icon={
                    openIndex === index
                      ? "mdi:chevron-down"
                      : "mdi:chevron-right"
                  }
                  className={`text-2xl transition-all duration-300 ${
                    openIndex === index ? "text-[#00ffff]" : "text-white"
                  }`}
                />
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "mt-4 max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-lg text-gray-300 mt-2 pl-2 border-l-2 border-[#00ffff]/30">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
