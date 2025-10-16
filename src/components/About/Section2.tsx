import { motion } from 'framer-motion'
import React from 'react'
import image_1 from '../../assets/images/Group 5.svg'

export const Section2 : React.FC = () => {
  const content = [
    {
      title: 'Mission',
      description: 'To empower businesses with cutting-edge web solutions that drive growth, enhance brand visibility, and foster meaningful customer engagement.'
    },
    {
      title: 'Vision',
      description: 'To be the leading digital solutions provider, renowned for transforming brands into dominant forces in the online space through innovation and excellence.'
    }
  ]
  return (
    <div className='bg-[#FFF8EF] grid place-content-center'>
      <div className='flex flex-col p-3 gap-5 mt-10 mb-5 md:mb-50'>
        <h1 className='font-clashDisplay text-[#25262A] font-medium text-3xl sm:text-4xl md:text-5xl'>Explosive Results Beyond Ordinary Digital Solutions</h1>
        <p className="font-poppins text-[#4b4c4d] text-[14px] md:text-[16px] md:px-20">
          For us, true accomplishment isn’t 
          just about delivering solutions, 
          it’s about the transformational impact they have on brand visibility, 
          customer engagement, traffic, and revenue growth.
        </p>
        <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-2 md:mx-10 lg:mx-30'>
          {content.map((item, index) => (
            <div key={index} className='bg-white rounded-2xl px-5 pb-4 md:pb-10'>
              <h1 className='font-clashDisplay font-medium text-xl md:text-3xl'> <span className='text-[#0071E3] text-5xl rounded'>. </span>{item.title}</h1>
              <p className='text-[#4b4c4d] md:text-sm font-poppins'>{item.description}</p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className='bg-[#25262A] mt-4 pt-7 pb-10 place-self-center shadow-2xs text-white rounded-3xl h-auto grid font-sora md:mt-1 md:absolute md:bottom-[-550px] md:px-5 md:py-5 lg:px-12 lg:py-7'
        >
          <div className='flex flex-col gap-3 mt-3 md:flex-row md:place-content-center lg:gap-3'>
            <div className='bg-[#0071E3] mx-10 rounded-4xl w-50 p-3 place-self-center md:mx-0 md:w-50 md:gap-5 lg:w-70'>
              <div className='flex justify-between md:mt-2'>
                <div className='grid place-content-center md:ml-5 '>
                  <h1 className='text-2xl font-extrabold md:text-3xl font-clashDisplay'>50K+</h1>
                  <p className='text-[12px]  font-medium'>Satisfied clients</p>
                </div>
                <div className='bg-white rounded-full flex place-content-center w-10 h-10 md:w-15 md:h-15'>
                  <img src={image_1} alt='An arrow' className='w-5'/>
                </div>
              </div>
              <p className='font-poppins text-[12px] mt-4 md:ml-4.5 md:pb-3'>Our awesome clients are industry experts around the world</p>
            </div>
            <div className='bg-[#FFFFFF] place-self-center text-black py-10 rounded-4xl grid place-content-center w-50 md:w-40'>
              <h1 className='text-3xl font-extrabold text-center font-clashDisplay'>13+</h1>
              <p className='font-poppins text-center mt-2 text-sm font-medium'>Years Experience</p>
            </div>
            <div className='bg-[#FFFFFF] place-self-center text-black py-10 rounded-4xl grid place-content-center w-50 md:w-40'>
              <h1 className='text-3xl font-extrabold text-center font-clashDisplay'>20</h1>
              <p className='font-poppins text-center mt-2 text-sm font-medium'>Profesional Designer</p>
            </div>
            <div className='bg-[#FFFFFF] place-self-center text-black py-10 rounded-4xl grid place-content-center w-50 md:w-40'>
              <h1 className='text-3xl font-extrabold text-center font-clashDisplay'>10K</h1>
              <p className='font-poppins text-center mt-2 text-sm font-medium'>Digital Product</p>
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  )
}
