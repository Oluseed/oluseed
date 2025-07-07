import React from 'react'
import image_1 from '../../assets/images/Group 5.svg'

export const User_Section_1: React.FC = () => {
  return (
    <section className='bg-[#25262A] m-3 py-5 px-5  place-self-center text-white rounded-2xl h-auto grid font-sora md:mt-10' >
      <div className='flex flex-col gap-3 mt-3 md:flex-row md:place-content-center lg:gap-3'>
        <div className='bg-[#0071E3] mx-10 rounded-2xl w-50 p-2 place-self-center md:mx-0 md:w-50 md:gap-5 lg:w-70'>
          <div className='flex justify-between md:mt-2'>
            <div className='grid place-content-center md:ml-5 '>
              <h1 className='text-2xl font-extrabold md:text-3xl'>50K+</h1>
              <p className='text-[12px] font-extralight'>Satisfied clients</p>
            </div>
            <div className='bg-white rounded-full flex place-content-center w-10 h-10 md:w-15 md:h-15'>
              <img src={image_1} alt='An arrow' className='w-5'/>
            </div>
          </div>
          <p className='font-poppins text-[12px] mt-4 md:ml-4.5 md:pb-3'>Our awesome clients are industry experts around the world</p>
        </div>
        <div className='bg-[#FFFFFF] place-self-center text-black py-10 rounded-2xl grid place-content-center w-50 md:w-40'>
          <h1 className='text-3xl font-extrabold text-center'>13+</h1>
          <p className='font-poppins text-center mt-2 text-sm'>Years Experience</p>
        </div>
        <div className='bg-[#FFFFFF] place-self-center text-black py-10 rounded-2xl grid place-content-center w-50 md:w-40'>
          <h1 className='text-3xl font-extrabold text-center'>20</h1>
          <p className='font-poppins text-center mt-2 text-sm'>Profesional Designer</p>
        </div>
        <div className='bg-[#FFFFFF] place-self-center text-black py-10 rounded-2xl grid place-content-center w-50 md:w-40'>
          <h1 className='text-3xl font-extrabold text-center'>10K</h1>
          <p className='font-poppins text-center mt-2 text-sm'>Digital Product</p>
        </div>
      </div>
    </section>
  )
}
