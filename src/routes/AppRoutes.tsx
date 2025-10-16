import React from 'react'
import { Routes, Route } from 'react-router'
import { MainLayout } from '../layouts/MainLayout'
import { Home } from '../pages/Home'
import { OurWork } from '../pages/OurWork'
import { About } from '../pages/About'
import { OurBlog } from '../pages/OurBlog'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<OurWork/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/blogs" element={<OurBlog/>} />
        <Route path="/contact" element={<div>Contact</div>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  )
}
