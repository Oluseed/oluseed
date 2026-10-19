import React from 'react';
import Hero_Section from '../components/home/Hero_Section';
import Stats from '../components/home/Stats';
import OurService from '../components/home/OurService';
import Projects from '../components/home/Projects';
import WhyOluseed from '../components/home/WhyOluseed';
import Testimonial from '../components/home/Testimonial';
import Faq from '../components/home/Faq';

export const Home: React.FC = () => {
  return (
    <>
      <Hero_Section />
      <Stats />
      <OurService />
      <Projects />
      <WhyOluseed />
      <Testimonial />
      <Faq />
    </>
  );
};
