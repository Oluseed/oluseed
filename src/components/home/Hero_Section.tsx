import React from 'react'
import { motion } from 'framer-motion'
import homeImage from '../../assets/images/herobg-1.png'
import image_1 from '../../assets/images/Frame 34130.svg'

const Hero_Section: React.FC = () => {
  return (
    <section 
      style={{ backgroundImage: `url(${homeImage})` }}
      className="relative bg-cover bg-center h-100 md:h-120 grid items-center font-clashDisplay">
      
      {/* Overlay */}
      <div className="absolute insert-10 bg-gray-400/20 z-100"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='bg-[#FFFFFF]/80 mx-4 py-5 sm:py-10 md:mx-0 rounded-2xl place-self-center p-3 grid place-content-center md:px-20 md:py-10'
      >
        <div className='grid'>
          <div className='flex items-center gap-3 place-content-center place-self-center'>
            <img 
              src={image_1} 
              alt="Image of people" 
              className="w-20"
            />
            <p className='text-[15px] font-poppins font-semibold text-[#1E1E1E]'>200 Satisfied Customer</p>
          </div>
          <div className='text-center mt-3'>
            <h1 className='text-3xl md:text-5xl font-semibold'>Ignition, Development and </h1>
            <h1 className='text-3xl md:text-5xl font-semibold text-[#0f04ff]'>Advancement</h1>
          </div>
          <p className='text-center place-self-center font-normal text-[#25262A] mt-2 text-sm md:text-[15px] font-poppins md:w-100 md:mt-4'>
            We create and design applications, websites,
            or other digital products with professionalism
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero_Section