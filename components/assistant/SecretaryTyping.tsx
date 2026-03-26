"use client";

import { motion } from "framer-motion";

export default function SecretaryTyping() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-mavik-line bg-white/[0.04] px-3 py-2">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-mavik-muted-strong"
          animate={{
            opacity: [0.35, 1, 0.35],
            y: [0, -1.5, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            delay: index * 0.12,
          }}
        />
      ))}
    </div>
  );
}

