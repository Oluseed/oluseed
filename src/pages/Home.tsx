import React from 'react'
import { Hero_Section } from '../components/home/Hero_Section'
import { OurService } from '../components/home/OurService'

export const Home: React.FC = () => {
  return (
    <div className="relative">
      <Hero_Section />
      <OurService/>
    </div>
  )
}
