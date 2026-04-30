import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { Teaching } from "@/components/sections/Teaching";
import { Publications } from "@/components/sections/Publications";
import { Personality } from "@/components/sections/Personality";
import { Nav, Footer } from "@/components/sections/Chrome";

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Skills />
        <Timeline />
        <Teaching />
        <Publications />
        <Personality />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
