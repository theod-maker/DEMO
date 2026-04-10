"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import data from "../data.json";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto border-t border-[#1e1e1e] pt-20" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#444444] mb-4 font-mono">Compétences</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] leading-tight">Ce que je maîtrise</h2>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1e1e1e]">
          {data.skills.map((category, i) => (
            <motion.div
              key={category.title}
              className="bg-[#0e0e0e] p-8 hover:bg-[#161616] transition-colors duration-300 group"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <h3 className="text-[11px] font-semibold text-[#f0f0f0] mb-6 tracking-widest uppercase">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((skill) => (
                  <li key={skill} className="text-sm text-[#444444] group-hover:text-[#555555] transition-colors duration-300">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
