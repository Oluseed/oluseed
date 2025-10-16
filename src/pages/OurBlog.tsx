import React from 'react'
import { HeroSection } from '../components/blogs/HeroSection'
import PostsPage from '../components/blogs/PostsPage'

export const OurBlog: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <PostsPage/>
    </div>
  )
}
