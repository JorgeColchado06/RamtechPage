"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 0.1,
        delay: stagger(0.015),
      }
    );
  }, [animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-[#00ffff] text-black opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="relative z-20 inline-block dark:text-[#00ffff] text-black text-2xl sm:text-3xl md:text-4xl lg:text-6xl underline decoration-[#00ffff] decoration-[3px] sm:decoration-[4px] md:decoration-[5px] lg:decoration-[6px] underline-offset-[8px] sm:underline-offset-[10px] md:underline-offset-[12px] lg:underline-offset-[16px] leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
export default TextGenerateEffect;