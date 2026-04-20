"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTab, type TabId } from "@/context/TabContext";
import { About } from "./About";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Education } from "./Education";
import { Contact } from "./Contact";

const SECTIONS: Record<TabId, React.ComponentType> = {
  about: About,
  skills: Skills,
  projects: Projects,
  education: Education,
  contact: Contact,
};

export function TabShell() {
  const { activeTab } = useTab();
  const Section = SECTIONS[activeTab];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Section />
      </motion.div>
    </AnimatePresence>
  );
}
