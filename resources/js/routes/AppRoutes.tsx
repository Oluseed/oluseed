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
import { NotFound } from '../pages/NotFound';
import { Privacy, Terms } from '../pages/Legal';
import { Internships } from '../pages/Internships';
import ScrollToTop from '../components/ScrollToTop';
import { AdminLayout } from '../admin/AdminLayout';
import { AdminLogin } from '../admin/AdminLogin';
import { Dashboard } from '../admin/Dashboard';
import { ContentEditor } from '../admin/ContentEditor';
import { ProjectsAdmin } from '../admin/ProjectsAdmin';
import { ApplicationsAdmin } from '../admin/ApplicationsAdmin';
import { MessagesAdmin } from '../admin/MessagesAdmin';

export const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="content/:slug" element={<ContentEditor />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="applications" element={<ApplicationsAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<OurWork />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<OurBlog />} />
          <Route path="/blogs/:id" element={<PostDetails />} />
          <Route path="/startup" element={<Startup />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
