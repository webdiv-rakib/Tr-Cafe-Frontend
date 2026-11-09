import React from 'react';
import { HeroSection } from './_components/HeroSection';
import { SpecialsSection } from './_components/SpecialsSection';
import { HowItWorks } from './_components/HowItWorks';
import { Footer } from './_components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900">
      <HeroSection />
      <SpecialsSection />
      <HowItWorks />
      <Footer />
    </main>
  );
}