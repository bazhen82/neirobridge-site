import { About } from "@/components/About";
import { Background } from "@/components/Background";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Solutions } from "@/components/Solutions";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Background />
      <Header />
      <Hero />
      <About />
      <Solutions />
      <Projects />
      <Process />
      <TechStack />
      <FAQ />
      <Contact />
      <footer className="border-t border-cyan-200/10 px-4 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} NeiroBridge. Мост между нейросетями и бизнесом.
      </footer>
    </main>
  );
}
