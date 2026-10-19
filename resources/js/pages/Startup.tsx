import React from 'react';
import { HeroSection } from '../components/startup/HeroSection';
import JobOpenings from '../components/startup/JobOpenings';
import Benefits from '../components/startup/Benefits';

const Startup: React.FC = () => {
  return (
    <>
      <HeroSection />
      <JobOpenings />
      <Benefits />
    </>
  );
};

export default Startup;
