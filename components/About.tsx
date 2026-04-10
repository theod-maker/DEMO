"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import data from "../data.json";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#444444] mb-4 font-mono">À propos</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] mb-7 leading-tight">Qui suis-je ?</h2>
          <div className="space-y-4 text-[#555555] leading-relaxed text-sm">
            {data.profile.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="flex gap-10 mt-10 mb-9 border-t border-[#1e1e1e] pt-8">
            {data.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <div className="text-3xl font-bold text-[#f0f0f0]">{stat.value}</div>
                <div className="text-[11px] text-[#444444] mt-1 tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href={data.profile.cvUrl}
            className="inline-flex items-center border border-[#2a2a2a] text-[#f0f0f0] px-6 py-3 rounded-full text-sm font-medium tracking-wide"
            whileHover={{ scale: 1.04, borderColor: "#f0f0f0" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Télécharger mon CV →
          </motion.a>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="aspect-[4/5] bg-[#161616] border border-[#2a2a2a] rounded-3xl flex items-center justify-center overflow-hidden">
            <span className="text-[#333333] text-xs font-mono">Photo à ajouter</span>
          </div>
          <div className="absolute -bottom-5 -left-5 w-28 h-28 bg-[#161616] border border-[#2a2a2a] rounded-3xl -z-10" />
          <div className="absolute -top-5 -right-5 w-16 h-16 bg-[#1e1e1e] rounded-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
