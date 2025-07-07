import React from 'react'
import { Hero_Section } from '../components/home/Hero_Section'
import { User_Section_1 } from '../components/home/User_Section_1'

export const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero background section */}
      <Hero_Section />

      {/* User Section overlayed on Hero Section in md and up */}
      <div className="md:absolute md:top-[75%] md:left-1/2 md:-translate-x-1/2 w-full px-4 md:px-0 z-20 lg:w-[auto]">
        <User_Section_1 />
      </div>
    </div>
  )
}
