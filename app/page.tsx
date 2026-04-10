import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import data from "../data.json";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <footer className="px-6 pb-10">
        <div className="max-w-6xl mx-auto border-t border-[#1e1e1e] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-[#333333] tracking-widest uppercase">{data.profile.initials}</span>
          <span className="text-[10px] text-[#333333] font-mono">© {new Date().getFullYear()} {data.profile.firstName} {data.profile.lastName}</span>
        </div>
      </footer>
    </>
  );
}
