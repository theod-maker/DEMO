"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import data from "../data.json";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const contactItems = [
    { label: "Email",    value: data.contact.email,    href: `mailto:${data.contact.email}` },
    { label: "LinkedIn", value: data.contact.linkedin.replace("https://", ""), href: data.contact.linkedin },
  ];

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto border-t border-[#1e1e1e] pt-20" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#444444] mb-4 font-mono">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] leading-tight">
            Travaillons ensemble
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm text-[#444444] leading-relaxed mb-10">
              Disponible pour une alternance, un stage ou toute opportunité dans le domaine de {data.profile.title.toLowerCase()}.
            </p>

            <div className="space-y-6">
              {contactItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <span className="text-[10px] font-mono text-[#333333] tracking-widest w-16 uppercase">{item.label}</span>
                  <span className="text-sm text-[#444444] group-hover:text-[#f0f0f0] transition-colors duration-200">
                    {item.value}
                  </span>
                </motion.a>
              ))}
              <div className="flex items-center gap-5">
                <span className="text-[10px] font-mono text-[#333333] tracking-widest w-16 uppercase">Lieu</span>
                <span className="text-sm text-[#333333]">{data.profile.location}</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="space-y-3"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {[
              { placeholder: "Votre nom",      type: "text" },
              { placeholder: "votre@email.com", type: "email" },
            ].map((field) => (
              <input
                key={field.placeholder}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full bg-[#161616] border border-[#1e1e1e] rounded-xl px-5 py-4 text-sm text-[#f0f0f0] placeholder-[#333333] focus:outline-none focus:border-[#2a2a2a] transition-colors"
              />
            ))}
            <textarea
              rows={5}
              placeholder="Votre message..."
              className="w-full bg-[#161616] border border-[#1e1e1e] rounded-xl px-5 py-4 text-sm text-[#f0f0f0] placeholder-[#333333] focus:outline-none focus:border-[#2a2a2a] transition-colors resize-none"
            />
            <motion.button
              type="submit"
              className="w-full bg-[#f0f0f0] text-[#0e0e0e] py-4 rounded-xl text-sm font-semibold tracking-wide"
              whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Envoyer le message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
