import React from 'react'
import { HeroSection } from '../components/our-work/HeroSection'
import { ProjectLists } from '../components/our-work/ProjectLists'
import Testimonial from '../components/home/Testimonial'

export const OurWork: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ProjectLists/>
      <Testimonial />
    </div>
  )
}
