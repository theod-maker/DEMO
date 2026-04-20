"use client";

import { createContext, useContext, useState } from "react";

export type TabId = "about" | "skills" | "projects" | "education" | "contact";

interface TabContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const TabContext = createContext<TabContextType>({
  activeTab: "about",
  setActiveTab: () => {},
});

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("about");
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  return useContext(TabContext);
}
