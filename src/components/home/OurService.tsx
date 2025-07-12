import React from 'react'
import svg_1 from '../../assets/images/Icon UX.svg'
import svg_2 from '../../assets/images/Icon Logo.svg';
import svg_3 from '../../assets/images/Icon Illustration.svg'
import image_1 from '../../assets/images/Group 5.svg'
import svg_4 from '../../assets/images/Icon Digital Painting.svg'
import svg_5 from '../../assets/images/Icon 3D.svg'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

export const OurService: React.FC = () => {
  return (
    <section className='bg-[#FFF8EF] h-full grid font-bai-jamjuree pb-4'>

      <div className='bg-[#25262A] mt-4 pt-3 pb-4  place-self-center shadow-2xs text-white rounded-3xl h-auto grid font-bai-jamjuree md:mt-1 md:absolute top-100 md:px-5 md:py-5 lg:px-12 lg:py-7' >
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
      </div>


      <div className='grid ml-2 mt-5 md:mt-50 place-content-center'>
        <div className='flex justify-between'>
          <div className='grid gap-2'>
            <h1 className='font-bold text-2xl md:text-3xl'>What We Serve</h1>
            <h1 className='font-bold text-2xl text-[#0071E3] md:text-3xl'>For Your Business</h1>
          </div>
          <button className='hidden md:block bg-[#0071E3] rounded-xl px-3 text-white place-self-center font-sora text-sm h-12'>Our Portfolio</button>
        </div>
        <div className='grid grid-cols-1 place-self-center md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 '>
          <div className='bg-white grid gap-2 rounded-2xl w-70 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <img src={svg_1} alt="Icon UX" className='w-10 h-15'/>
            <h1 className='font-bold md:text-xl'>Research and Analysis</h1>
            <p className='font-manrope text-[12px]' style={{fontWeight:"400"}}>Product that have a good appearance can attract users </p>
            <div className='flex mt-3 items-center gap-2 font-light cursor-pointer hover:underline'>
              <NavLink to="/contact">Contact Us</NavLink>
              <FaArrowRight className='inline ml-2 font'/>
            </div>
          </div>
          <div className='bg-[#0071E3] text-white grid gap-2 rounded-2xl w-70 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <img src={svg_2} alt="Icon UX" className='w-10 h-15'/>
            <h1 className='font-bold md:text-xl'>Custom Product Development</h1>
            <p className='font-manrope text-[12px]' style={{fontWeight:"400"}}>Product identity is needed to have a characteristic</p>
            <div className='flex items-center gap-2 mt-3 font-light cursor-pointer hover:underline'>
              <NavLink to="/contact">Contact Us</NavLink>
              <FaArrowRight className='inline ml-2 font'/>
            </div>
          </div>
          <div className='bg-white grid gap-2 rounded-2xl w-70 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <img src={svg_3} alt="Icon UX" className='w-10 h-15'/>
            <h1 className='font-bold md:text-xl'>Web Development</h1>
            <p className='font-manrope text-[12px]' style={{fontWeight:"400"}}>3D design is something new and has a high chance</p>
            <div className='flex mt-3 items-center gap-2 font-light cursor-pointer hover:underline'>
              <NavLink to="/contact">Contact Us</NavLink>
              <FaArrowRight className='inline ml-2 font'/>
            </div>
          </div>
          <div className='bg-white grid gap-2 rounded-2xl w-70 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <img src={svg_4} alt="Icon UX" className='w-10 h-15'/>
            <h1 className='font-bold md:text-xl'>Digital Marketing</h1>
            <p className='font-manrope text-[12px]' style={{fontWeight:"400"}}>Make your product more eye-catching with a touch of illustration</p>
            <div className='flex mt-3 items-center gap-2 font-light cursor-pointer hover:underline'>
              <NavLink to="/contact">Contact Us</NavLink>
              <FaArrowRight className='inline ml-2 font'/>
            </div>
          </div>
          <div className='bg-white grid gap-2 rounded-2xl w-70 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <img src={svg_5} alt="Icon UX" className='w-10 h-15'/>
            <h1 className='font-bold md:text-xl'>Product Design</h1>
            <p className='font-sora text-[12px]' style={{fontWeight:"400"}}>In this era, digital painting is still very popular with young people</p>
            <div className='flex mt-3 items-center gap-2 font-light cursor-pointer hover:underline'>
              <NavLink to="/contact">Contact Us</NavLink>
              <FaArrowRight className='inline ml-2 font'/>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}
