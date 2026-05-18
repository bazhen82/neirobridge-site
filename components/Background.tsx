"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  duration: 8 + (index % 7),
  delay: index * 0.18
}));

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-70" />
      <motion.div
        className="scanline absolute left-0 top-0 h-40 w-full"
        animate={{ y: ["-20vh", "120vh"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_16px_rgba(103,246,255,0.9)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{
            y: [0, -26, 0],
            opacity: [0.18, 0.9, 0.18],
            scale: [1, 1.8, 1]
          }}
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
