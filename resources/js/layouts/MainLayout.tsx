import React from 'react';
import { useLocation, useOutlet } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { Cursor, PageTransition, Preloader, ScrollProgress } from '../components/motion';
import { useContent } from '../content/useContent';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const { content } = useContent();

  return (
    <div className="flex min-h-screen flex-col">
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>{outlet}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      {content.brand.whatsapp && <WhatsAppButton phoneNumber={content.brand.whatsapp} />}
    </div>
  );
};
