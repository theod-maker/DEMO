import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TabShell } from "@/components/TabShell";
import { TabProvider } from "@/context/TabContext";
import data from "../data.json";

export default function Home() {
  return (
    <TabProvider>
      <Navbar />
      <main>
        <Hero />
        <TabShell />
      </main>
      <footer className="px-6 pb-10">
        <div className="max-w-6xl mx-auto border-t border-[#1e1e1e] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-[#333333] tracking-widest uppercase">{data.profile.initials}</span>
          <span className="text-[10px] text-[#333333] font-mono">© {new Date().getFullYear()} {data.profile.firstName} {data.profile.lastName}</span>
        </div>
      </footer>
    </TabProvider>
  );
}
