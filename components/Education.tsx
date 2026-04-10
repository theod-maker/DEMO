"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import data from "../data.json";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-28 px-6">
      <div className="max-w-6xl mx-auto border-t border-[#1e1e1e] pt-20" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#444444] mb-4 font-mono">Parcours</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] leading-tight">Formation & Expériences</h2>
        </motion.div>

        <div className="space-y-px bg-[#1e1e1e]">
          {data.experience.map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#0e0e0e] hover:bg-[#161616] transition-colors duration-300 px-8 py-7 flex flex-col md:flex-row md:items-start gap-4 md:gap-10 group"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex-shrink-0 min-w-[140px]">
                <span className="text-[10px] font-mono text-[#333333] tracking-widest">{item.year}</span>
              </div>
              <div className="flex-1">
                <span className={`inline-block text-[10px] px-3 py-1 rounded-full mb-3 font-medium tracking-widest uppercase ${
                  item.type === "Formation"
                    ? "bg-[#1a2a1a] text-[#4a7a4a] border border-[#2a3a2a]"
                    : "bg-[#1a1a2a] text-[#4a4a7a] border border-[#2a2a3a]"
                }`}>
                  {item.type}
                </span>
                <h3 className="text-sm font-semibold text-[#f0f0f0] mb-1 group-hover:text-[#dddddd] transition-colors">{item.title}</h3>
                <p className="text-sm text-[#444444] mb-2">{item.place}</p>
                <p className="text-sm text-[#333333] leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
