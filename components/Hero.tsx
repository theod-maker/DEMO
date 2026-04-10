"use client";

import { motion } from "framer-motion";
import data from "../data.json";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#ffffff]/[0.02] blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#ffffff]/[0.015] blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase text-[#444444] mb-8 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {data.profile.title}
        </motion.p>

        {[data.profile.firstName, data.profile.lastName].map((word, i) => (
          <div key={word} className="overflow-hidden">
            <motion.h1
              className={`text-[clamp(4.5rem,13vw,10rem)] font-bold leading-[0.88] tracking-tight ${
                i === 1 ? "text-[#333333]" : "text-[#f0f0f0]"
              }`}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.12 }}
            >
              {word}
            </motion.h1>
          </div>
        ))}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
          <motion.p
            className="text-sm text-[#444444] max-w-sm leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            {data.profile.bio[0]}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="inline-flex items-center bg-[#f0f0f0] text-[#0e0e0e] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide"
              whileHover={{ scale: 1.04, backgroundColor: "#ffffff" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Voir mes projets
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center border border-[#2a2a2a] text-[#f0f0f0] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide"
              whileHover={{ scale: 1.04, borderColor: "#f0f0f0" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Me contacter
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.span
          className="text-[9px] tracking-[0.35em] uppercase text-[#333333] font-mono"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#444444] to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          style={{ originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
