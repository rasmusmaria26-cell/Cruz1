"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, duration: number, delay: number = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const elapsed = Math.max(0, progress - delay * 1000);
      const percentage = Math.min(elapsed / (duration * 1000), 1);

      setCount(Math.round(easeOut(percentage) * target));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration, delay]);

  return { count, ref };
}

interface Props {
  to: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}

export default function AnimatedCounter({ to, suffix = "", duration = 1.2, delay = 0 }: Props) {
  const { count, ref } = useCountUp(to, duration, delay);

  return (
    <motion.span ref={ref}>
      {count}{suffix}
    </motion.span>
  );
}
