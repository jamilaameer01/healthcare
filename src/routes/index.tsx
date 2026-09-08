import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { CareCategories } from "@/components/sections/CareCategories";
import { CareFinder } from "@/components/sections/CareFinder";
import { Connected } from "@/components/sections/Connected";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TreatmentSequence } from "@/components/sections/TreatmentSequence";
import { HealthAssessment } from "@/components/sections/HealthAssessment";
import { PatientStories } from "@/components/sections/PatientStories";
import { Specialists } from "@/components/sections/Specialists";
import { Trust } from "@/components/sections/Trust";
import { Education } from "@/components/sections/Education";

import { HealthTools } from "@/components/sections/HealthTools";
import { Contact } from "@/components/sections/Contact";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Health — Better care, made personal" },
      {
        name: "description",
        content:
          "Modern healthcare designed around you: weight and hormone care, hair health, preventive reviews, labs and wellness, with one team and one shared record.",
      },
      { property: "og:title", content: "Meridian Health — Better care, made personal" },
      {
        property: "og:description",
        content:
          "Weight management, hormone health, hair health, preventive reviews, labs and wellness from a small team of clinicians.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <CareCategories />
      <CareFinder />
      <TreatmentSequence />
      <Connected />
      <HowItWorks />
      <HealthAssessment />
      <PatientStories />
      <Specialists />
      <Trust />
      <Education />
      <HealthTools />
      <Contact />
      <FinalCTA />
    </>
  );
}
