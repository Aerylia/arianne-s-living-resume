import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { Teaching } from "@/components/sections/Teaching";
import { Publications } from "@/components/sections/Publications";
import { Personality } from "@/components/sections/Personality";
import { Nav, Footer } from "@/components/sections/Chrome";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Arianne Meijer-van de Griend — Quantum Software Engineer" },
      {
        name: "description",
        content:
          "Living resume of Arianne Meijer-van de Griend: quantum software engineer, postdoc on NISQ compilation at the University of Helsinki, and creative nerd.",
      },
      { property: "og:title", content: "Arianne Meijer-van de Griend" },
      {
        property: "og:description",
        content:
          "Quantum software engineer · postdoc · creative nerd. Publications, career timeline, teaching, and a (no) box.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
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
