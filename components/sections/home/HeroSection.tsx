import ThreeDMarquee from '@/components/ui/3d-marquee'
import TextGenerateEffect from '@/components/ui/text-generate-effect'
import TextGenerateEffect1 from '@/components/ui/text-generate-effect1'
import React from 'react'
import { auth } from '@/lib/auth'

const words1 = "Haz crecer tu negocio con";
const words = "Ramtech Solutions";

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

const HeroSection = async () => {
    const session = await auth() 
  return (
    <>
        <section className="relative mx-auto flex h-[60vh] w-full max-w-full flex-col items-center justify-center overflow-hidden">
        {/* Background: ThreeDMarquee como fondo con mejor posicionamiento */}
        <div className="absolute inset-0 z-0 w-full h-full">
        <ThreeDMarquee
            className="pointer-events-none w-full h-full"
            images={image.map((img) => img.src)}
        />
        {/* Overlay con mejor contraste y transición */}
        <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-b from-black/90 to-black/70 dark:from-black/70 dark:to-black/50 backdrop-blur-sm transition-opacity duration-300" />
        </div>
        
        {/* Contenido principal con mejor z-index para estar por encima del fondo */}
        <div className="relative z-20 flex flex-col items-center mt-20 px-4">
        <TextGenerateEffect1 words1={words1} />

        <TextGenerateEffect words={words} />

        <p className="mx-auto max-w-2xl py-8 text-center md:text-2xl text-gray-200">
            Potenciamos tu éxito con soluciones SaaS de vanguardia diseñadas para
            la escalabilidad, la eficiencia y el crecimiento.
        </p>
        <p className='text-white text-2xl font-bold'>Bienvenido <span className='text-[#00ffff]'>{session?.user?.name}</span></p>
        </div>
    </section>
    {/* Decoración */}
    <div className="h-1 w-full bg-gradient-to-r from-[#00ffff]/10 via-[#00ffff]/60 to-[#00ffff]/10"></div>
    </>
  )
}

export default HeroSection