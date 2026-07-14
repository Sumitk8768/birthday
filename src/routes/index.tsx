import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { BirthdayMode } from "@/components/birthday/BirthdayMode";
import { Cake } from "@/components/birthday/Cake";
import { FinalSurprise } from "@/components/birthday/FinalSurprise";
import { Footer } from "@/components/birthday/Footer";
import { FunFacts } from "@/components/birthday/FunFacts";
import { HappyBirthday } from "@/components/birthday/HappyBirthday";
import { Hero } from "@/components/birthday/Hero";
import { Loader } from "@/components/birthday/Loader";
import { ProgressIndicator } from "@/components/birthday/ProgressIndicator";
import { Quotes } from "@/components/birthday/Quotes";
import { SparklesCursor } from "@/components/birthday/SparklesCursor";
import { TypewriterStory } from "@/components/birthday/TypewriterStory";
import { Wishes } from "@/components/birthday/Wishes";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [loaded, setLoaded] = useState(false);
  const [opened, setOpened] = useState(false);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0F172A" }}>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <SparklesCursor />
      {opened && <ProgressIndicator />}

      <div id="hero">
        <Hero onOpen={() => setOpened(true)} />
      </div>

      {opened && (
        <>
          <div id="story">
            <TypewriterStory />
          </div>
          <div id="birthday">
            <HappyBirthday />
          </div>
          <BirthdayMode />
          <div id="wishes">
            <Wishes />
          </div>
          <FunFacts />
          <Quotes />
          <div id="cake">
            <Cake />
          </div>
          <div id="surprise">
            <FinalSurprise />
          </div>
          <Footer />
        </>
      )}
    </main>
  );
}
