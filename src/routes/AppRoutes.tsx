import React from 'react'
import { Routes, Route } from 'react-router'
import { MainLayout } from '../layouts/MainLayout'
import { Home } from '../pages/Home'
import { OurWork } from '../pages/OurWork'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<OurWork/>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  )
}
