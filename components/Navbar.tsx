"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data.json";
import { useTab } from "@/context/TabContext";
import { TABS_CONFIG } from "@/config/tabs.config";
import { EASE_OUT_EXPO } from "@/components/animations";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeTab, setActiveTab } = useTab();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
      <motion.nav
        className={`max-w-6xl mx-auto px-6 h-14 flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-[#0e0e0e]/80 backdrop-blur-xl border border-[#2a2a2a]"
            : "bg-transparent"
        }`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.4 }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs font-bold tracking-[0.2em] uppercase text-[#f0f0f0]"
        >
          {data.profile.initials}
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {TABS_CONFIG.map((tab, i) => (
            <motion.li
              key={tab.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
            >
              <button
                onClick={() => setActiveTab(tab.id)}
                className="relative px-4 py-2 text-xs tracking-wide transition-colors duration-200"
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-[#1e1e1e]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    activeTab === tab.id ? "text-[#f0f0f0]" : "text-[#555555]"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        <motion.button
          onClick={() => setActiveTab("contact")}
          className="hidden md:inline-flex items-center border border-[#2a2a2a] text-[#f0f0f0] px-5 py-2 rounded-full text-xs font-medium tracking-wide hover:bg-[#f0f0f0] hover:text-[#0e0e0e] transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Me contacter
        </motion.button>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <motion.span
            className="block w-5 h-px bg-[#f0f0f0]"
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-5 h-px bg-[#f0f0f0]"
            animate={menuOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-5 h-px bg-[#f0f0f0]"
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mx-4 mt-2 bg-[#161616] border border-[#2a2a2a] rounded-2xl px-6 py-5"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col gap-5">
              {TABS_CONFIG.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMenuOpen(false);
                    }}
                    className={`text-sm transition-colors ${
                      activeTab === tab.id ? "text-[#f0f0f0]" : "text-[#555555] hover:text-[#f0f0f0]"
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
