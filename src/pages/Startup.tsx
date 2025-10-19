import React from 'react'
import { HeroSection } from '../components/startup/HeroSection'
import JobOpenings from '../components/startup/JobOpenings'
import Benefits from '../components/startup/Benefits'

const Startup: React.FC = () => {
  return (
    <div>
      <HeroSection/>
      <JobOpenings/>
      <Benefits/>
    </div>
  )
}

export default Startup