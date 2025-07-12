import React from 'react'

import { NavLink } from 'react-router-dom'
import { Button } from '../Button'
import NavArrow from '../../assets/images/Group 5.svg'
import project_image_1 from '../../assets/images/box-image-1.svg'
import { FaCircle, FaDotCircle } from 'react-icons/fa'

export const Projects: React.FC = () => {
  return (
    <section className='bg-[#ffffff] h-full grid font-bai-jamjuree mt-4 p-2 lg:p-5'>
      <div className='grid'>
        <div className='flex justify-between'>
          <div className='grid'>
            <h1 className='text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl'>Projects We </h1>
            <h1 className='text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl'>have <span className='text-[#0071E3]'>Completed</span></h1>
          </div>
          <div className='flex items-center gap-2'>
            <NavLink to="">
              <Button
                text='Start New Project'
                className='
                  hidden sm:block 
                  sm:bg-white sm:shadow-md 
                  sm:p-2 sm:rounded 
                  sm:font-medium sm:text-[14px]
                  lg:text-base lg:cursor-pointer
                '
              />
            </NavLink>
            <NavLink to="/">
              <Button
                text='View all work'
                className="
                  bg-[#0071E3] text-white 
                  shadow-md px-5
                  py-3 rounded-xl
                  font-[400] text-[12px] 
                  sm:text-sm lg:text-base
                  lg:cursor-pointer
                "
              />
            </NavLink>
          </div>
        </div>
        {/* Lists of projects */}
        <div className='
          grid grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-4 mt-4
        '>
          <div 
            style={{ backgroundImage: `url(${project_image_1})` }}
            className='
              bg-cover bg-center
              h-100 rounded-3xl 
              p-5 m-5
              grid place-content-between
          '>
            <NavLink 
              to="" 
            >
              <img 
                src={NavArrow} 
                alt="Arrow navigating to the works section" 
                className='
                  place-self-end bg-white
                  p-5 rounded-full
                '
              />
            </NavLink>
            <div 
              className='
                grid bg-white
                p-5 rounded-3xl
                gap-2
              '
            >
              <div
                className='
                  flex gap-2
                '
              >
                <FaCircle size={9} className='place-self-center text-[#0071E3]'/>
                <h1 className='font-bold text-xl'>AR 3D Design Concept</h1>
              </div>
              <p className='font-poppins font-[400] text-gray-600 text-sm'>AR creation with 3D design to solve problems with.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
