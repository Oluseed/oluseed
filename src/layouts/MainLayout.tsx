import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';

export const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}
