"use client";

import type { TabId } from "@/context/TabContext";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

export const TABS_CONFIG: { id: TabId; label: string; component: React.ComponentType }[] = [
  { id: "about", label: "À propos", component: About },
  { id: "skills", label: "Compétences", component: Skills },
  { id: "projects", label: "Projets", component: Projects },
  { id: "education", label: "Formation", component: Education },
  { id: "contact", label: "Contact", component: Contact },
];
