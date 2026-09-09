import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { CareCategories } from "@/components/sections/CareCategories";
import { CareFinder } from "@/components/sections/CareFinder";
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
import { DigitalCare } from "@/components/sections/DigitalCare";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thryve Wellness — Refined Wellness. Elevated Results." },
      {
        name: "description",
        content:
          "A concierge-level wellness practice in Naples, Florida: direct primary care, hormone optimization, medically guided weight management, peptide therapy and SkinPen® microneedling.",
      },
      {
        property: "og:title",
        content: "Thryve Wellness — Refined Wellness. Elevated Results.",
      },
      {
        property: "og:description",
        content:
          "Direct primary care, hormone optimization, medical weight management, peptide therapy and aesthetics in Naples, Florida.",
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
      <TreatmentSequence />
      <CareCategories />
      <DigitalCare />
      <CareFinder />
      
       <HealthAssessment />
      <HowItWorks />
     
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
