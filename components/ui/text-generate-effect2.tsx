"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect2 = ({
  words2,
  className,
  filter = true,
  duration = 0.5,
}: {
  words2: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words2.split(" "); // Cambiado a usar words1

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.3),
      }
    );
  }, [scope, animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-gray-200 text-black opacity-0"
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
        <div className="relative z-20 mx-auto max-w-2xl py-8 text-center text-lg dark:text-gray-200 text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

export default TextGenerateEffect2;