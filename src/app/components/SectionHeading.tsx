"use client";
import { motion, type Variants } from "framer-motion";

interface Props {
  label: string;
  title: string;
  accent?: string;
  light?: boolean;
}

export default function SectionHeading({ label, title, accent, light }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-16"
    >
      {/* Label */}
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.05 } } }}
        className="label-tag mb-5"
      >
        {label}
      </motion.div>

      {/* Animated rule line */}
      <motion.div
        variants={{
          hidden: { scaleX: 0, originX: 0 },
          visible: { scaleX: 1, originX: 0, transition: { duration: 0.7, ease: "easeOut" } },
        }}
        className="h-px bg-gold/25 mb-6 w-24"
      />

      {/* Title */}
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.7, ease: "easeOut" } },
        }}
        className={`font-cormorant text-4xl md:text-6xl font-light leading-tight ${light ? "text-bone/70" : "text-bone"}`}
      >
        {accent ? (
          <>
            {title.split(accent)[0]}
            <em className="text-gold not-italic">{accent}</em>
            {title.split(accent)[1]}
          </>
        ) : title}
      </motion.h2>
    </motion.div>
  );
}
