"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTab } from "@/context/TabContext";
import { TABS_CONFIG } from "@/config/tabs.config";
import { EASE_OUT_EXPO } from "@/components/animations";

const SECTION_MAP = Object.fromEntries(
  TABS_CONFIG.map(({ id, component }) => [id, component])
) as Record<string, React.ComponentType>;

export function TabShell() {
  const { activeTab } = useTab();
  const Section = SECTION_MAP[activeTab];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      >
        <Section />
      </motion.div>
    </AnimatePresence>
  );
}
