"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type TabId = "about" | "skills" | "projects" | "education" | "contact";

interface TabContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const TabContext = createContext<TabContextType | null>(null);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("about");
  const value = useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);
  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

export function useTab() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("useTab must be used within TabProvider");
  return ctx;
}
