import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
