import { useEffect, useState } from "react";
import { Footer } from "./components/layout/Footer";
import { Navigation } from "./components/layout/Navigation";
import { Preloader } from "./components/layout/Preloader";
import { About } from "./components/sections/About";
import { Collections } from "./components/sections/Collections";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Portfolio } from "./components/sections/Portfolio";
import { Process } from "./components/sections/Process";
import { ScrollTrigger } from "./lib/motion";

type Phase = "loading" | "revealed" | "done";

export default function App() {
  const [phase, setPhase] = useState<Phase>("loading");

  // Trigger positions depend on fonts and images: re-measure once they settle.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  useEffect(() => {
    if (phase === "done") ScrollTrigger.refresh();
  }, [phase]);

  return (
    <>
      <Navigation />
      <main id="main">
        <Hero ready={phase !== "loading"} />
        <About />
        <Portfolio />
        <Collections />
        <Process />
        <Contact />
      </main>
      <Footer />
      {phase !== "done" && (
        <Preloader
          onReveal={() => setPhase((p) => (p === "loading" ? "revealed" : p))}
          onDone={() => setPhase("done")}
        />
      )}
    </>
  );
}
