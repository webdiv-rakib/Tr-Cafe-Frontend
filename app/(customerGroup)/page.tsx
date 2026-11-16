import React from 'react';
import { HeroSection } from './_components/HeroSection';
import { SpecialsSection } from './_components/SpecialsSection';
import { HowItWorks } from './_components/HowItWorks';
import { Footer } from './_components/Footer';
import { getMe } from '@/service/getMe';

export default async function HomePage() {
  console.log("Root Route")
  const user = await getMe()
  console.log(user)
  return (
    <main className="min-h-screen flex flex-col bg-neutral-900">
      <HeroSection />
      <SpecialsSection />
      <HowItWorks />
      <Footer />
    </main>
  );
}