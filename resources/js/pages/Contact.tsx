import React from 'react';
import { HeroSection } from '../components/contact/HeroSection';
import ContactDetails from '../components/contact/ContactDetails';
import Section2 from '../components/contact/Section2';

const Contact: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ContactDetails />
      <Section2 />
    </>
  );
};

export default Contact;
