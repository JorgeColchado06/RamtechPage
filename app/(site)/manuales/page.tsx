"use client";

import Carousel from "@/components/ui/carousel";

export default function CarouselDemo() {
  const slideData1 = [
    {
      title: "Mystic Mountains",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Urban Dreams",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Forest Path",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Snowy Peaks",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Golden Sunset",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  const slideData2 = [
    {
      title: "Neon Nights",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Desert Whispers",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "City Lights",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Ocean Waves",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Mountain View",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  const slideData3 = [
    {
      title: "Ocean Breeze",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Golden Hour",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Starry Night",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Forest Trail",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Sunny Beach",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];
 /*
  const slideData4 = [
    {
      title: "Ocean Breeze",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Golden Hour",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Starry Night",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Forest Trail",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Sunny Beach",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  const slideData5 = [
    {
      title: "Ocean Breeze",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Golden Hour",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Starry Night",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Forest Trail",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Sunny Beach",
      button: "Ver Manual",
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];
*/


  return (
    <div className="relative overflow-hidden w-full h-full py-20 space-y-48 mt-20 mb-32">
      {/* Primer carrusel */}
      <div>
        <h2 className="text-4xl font-bold ml-36 text-white mb-8">
          Tus <span className="relative z-20 inline-block rounded-xl text-[#00ffff]">
          Manuales
        </span>
        </h2>
        <Carousel slides={slideData1} />
      </div>

      {/* Segundo carrusel */}
      <div>
      <h2 className="text-4xl font-bold ml-36 text-white mb-8">
          Recomendaciones <span className="relative z-20 inline-block rounded-xl text-[#00ffff]">
          Para Ti
        </span>
        </h2>
        <Carousel slides={slideData2} />
      </div>

      {/* Tercer carrusel */}
      <div>
      <h2 className="text-4xl font-bold ml-36 text-white mb-8">
          Exlusivo de <span className="relative z-20 inline-block rounded-xl text-[#00ffff]">
          Enterprise
        </span>
        </h2>
        <Carousel slides={slideData3} />
      </div>
    </div>
  );
}