import React from 'react'
import { HeroSection } from '../components/About/HeroSection'
import { Section2 } from '../components/About/Section2'
import { Section3 } from '../components/About/Section3'
import Testimonial from '../components/home/Testimonial'
import Faq from '../components/home/Faq'

export const About: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <Section2/>
      <Section3/>
      <Testimonial/>
      <Faq/>
    </div>
  )
}
