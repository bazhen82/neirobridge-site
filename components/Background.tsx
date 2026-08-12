"use client";

import { motion, useReducedMotion } from "framer-motion";

const particles = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  duration: 10 + (index % 7),
  delay: index * 0.35
}));

export function Background() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-70" />
      {!reduceMotion && (
        <motion.div
          className="scanline absolute left-0 top-0 h-40 w-full"
          animate={{ y: ["-20vh", "120vh"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
      )}
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_16px_rgba(103,246,255,0.9)]"
          style={{ left: particle.left, top: particle.top }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -18, 0],
                  opacity: [0.2, 0.7, 0.2],
                  scale: [1, 1.4, 1]
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      <div className="absolute inset-x-0 top-0 h-px bg-cyan-200/40 shadow-[0_0_28px_rgba(103,246,255,0.8)]" />
    </div>
  );
}
