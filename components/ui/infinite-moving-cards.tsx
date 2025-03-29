"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  logos,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  logos: {
    src: string; // URL de la imagen del logo
    url: string; // Enlace al que redirige el logo
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      if (scrollerRef.current.children.length === logos.length) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "15s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-5xl overflow-hidden justify-center items-center [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 justify-center items-center",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {logos.map((logo, idx) => (
          <li
            className="relative w-[150px] max-w-full shrink-0 rounded-2xl flex justify-center items-center"
            key={idx}
          >
            <a href={logo.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={logo.src}
                alt={`Logo ${idx}`}
                className="w-full h-auto object-contain"
                width={200}
                height={200}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;