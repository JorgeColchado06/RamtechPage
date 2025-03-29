import { useState } from "react";
import { Icon } from "@iconify/react";

const faqs = [
  { question: "¿Cómo puedo crear una cuenta?", answer: "Para crear una cuenta, debes comunicarte con el soporte técnico de RamTech Solutions." },
  { question: "¿Puedo cambiar mi contraseña?", answer: "Sí, puedes cambiar tu contraseña desde la configuración de tu perfil en la página de cliente." },
  { question: "¿Qué hacer si olvidé mi contraseña?", answer: "Puedes solicitar un restablecimiento de contraseña en la página de inicio de sesión." },
  { question: "¿Cómo contacto al soporte?", answer: "Puedes contactar al soporte a través del chat en línea o enviando un correo a soporte@ramtech.com." },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 text- font-[Planquin Dark]">
      {/* Ajuste del ancho general */}
      <div className="space-y-12">
        {/* Más espacio entre las preguntas */}
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-white rounded-2xl p-6 transition-all duration-200 cursor-pointer ${
              openIndex === index ? "scale-105 shadow-lg shadow-[#3D8EBA]" : ""
            }`}
            onClick={() => toggleFAQ(index)} // Hacemos clickeable todo el contenedor
          >
            <div className="flex justify-between items-center w-full text-xl font-semibold">
              {/* Ajuste del tamaño del texto */}
              {faq.question}
              <Icon
                icon={openIndex === index ? "mdi:chevron-down" : "mdi:chevron-right"}
                className="text-3xl text-white transition-transform"
                // Ajuste del tamaño del ícono
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "mt-4 opacity-100" : "h-0 opacity-0"
              }`}
            >
              <p className="text-lg text-gray-300 mt-2">{faq.answer}</p>
              {/* Ajuste del tamaño del texto de la respuesta */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}