import React from 'react';
import { Routes, Route } from 'react-router';
import { MainLayout } from '../layouts/MainLayout';
import { Home } from '../pages/Home';
import { OurWork } from '../pages/OurWork';
import { About } from '../pages/About';
import { OurBlog } from '../pages/OurBlog';
import PostDetails from '../components/blogs/PostDetails';
import Startup from '../pages/Startup';
import { Shop } from '../pages/Shop';
import ProductDetails from '../components/shop/ProductDetails';
import Contact from '../pages/Contact';
import ScrollToTop from '../components/ScrollToTop'; 

export const AppRoutes: React.FC = () => {
  return (
    <>

      <ScrollToTop />  
      
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<OurWork />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<OurBlog />} />
          <Route path="/blogs/:id" element={<PostDetails />} />
          <Route path="/startup" element={<Startup />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
};
