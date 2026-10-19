import React from 'react';
import { HeroSection } from '../components/internships/HeroSection';
import { InternshipList } from '../components/internships/InternshipList';
import Faq from '../components/home/Faq';

export const Internships: React.FC = () => {
  return (
    <>
      <HeroSection />
      <InternshipList />
      <Faq />
    </>
  );
};
