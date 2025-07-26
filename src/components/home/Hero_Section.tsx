import React from 'react'
import { motion } from 'framer-motion'
import homeImage from '../../assets/images/home.svg';
import image_1 from '../../assets/images/Frame 34130.svg'

export const Hero_Section: React.FC = () => {
  return (
    <section 
      style={{ backgroundImage: `url(${homeImage})` }}
      className="relative bg-cover bg-center h-100 md:h-120 grid items-center font-sora">
      
      {/* Overlay */}
      <div className="absolute insert-10 bg-gray-400/20 z-100"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='bg-[#FFFFFF]/80 mx-4 md:mx-0 rounded-2xl place-self-center p-3 grid place-content-center md:px-15 md:py-10'
      >
        <div>
          <div className='flex items-center gap-3 place-content-center place-self-center'>
            <img 
              src={image_1} 
              alt="Image of people" 
              className="w-20"
            />
            <p className='text-sm font-poppins font-semibold text-[#1E1E1E]'>50K+ Satisfied Customer</p>
          </div>
          <div className='text-center mt-3'>
            <h1 className='text-3xl md:text-4xl font-semibold'>Empty Life Without </h1>
            <h1 className='text-3xl md:text-4xl font-semibold text-[#0071E3]'>Beautiful Design</h1>
          </div>
          <p className='text-center font-normal text-[#323235] mt-2 text-sm md:text-[15px] font-poppins md:w-100 md:mt-4'>
            We create and design applications, websites,
            or other digital products with professionalism
          </p>
        </div>
      </motion.div>
    </section>
  )
}
