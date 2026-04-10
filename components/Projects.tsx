"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import data from "../data.json";

function ProjectCard({ project, index }: { project: typeof data.projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative aspect-video rounded-2xl mb-5 overflow-hidden border border-[#1e1e1e]"
        style={{ backgroundColor: project.bg }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#2a2a2a] text-xs font-mono">Image à ajouter</span>
        </div>

        <motion.div
          className="absolute inset-0 bg-[#0e0e0e]/95 flex flex-col justify-end p-7"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#444444] mb-2 font-mono">{project.category}</p>
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-3">{project.title}</h3>
            <p className="text-sm text-[#555555] leading-relaxed">{project.description}</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="px-1 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#333333] mb-1.5 font-mono">{project.category}</p>
          <h3 className="text-sm font-semibold text-[#f0f0f0] group-hover:text-[#888888] transition-colors duration-300">{project.title}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end mt-0.5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] border border-[#2a2a2a] text-[#444444] px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto border-t border-[#1e1e1e] pt-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#444444] mb-4 font-mono">Projets</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] leading-tight">Mes réalisations</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-10">
          {data.projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
