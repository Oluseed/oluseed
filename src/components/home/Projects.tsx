import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../Button'
import project_image_1 from '../../assets/images/box-image-1.svg'
import { ProjectsCard } from '../ProjectsCard'

export const Projects: React.FC = () => {
   const projectLists = [
    {
      title: 'AR 3D Design Concept',
      description: 'AR creation with 3D design to solve problems with.',
      image: project_image_1
    },
    {
      title: 'Web development',
      description: 'AR creation with 3D design to solve problems with.',
      image: project_image_1
    },
    {
      title: 'AR 3D Design Concept',
      description: 'AR creation with 3D design to solve problems with.',
      image: project_image_1
    }

  ]

  // const [currentIndex, setCurrentIndex] = React.useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev === projectLists.length - 1 ? 0 : prev + 1))
  //   }, 4000) // displays every 4 seec 
  //   return () => clearInterval(interval)
  // })

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
          {/* Projects Mobile View */}
          <ul className='grid grid-cols-1 place-self-center md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
            {projectLists.map((project, index) => (
              <li key={index} className='transform transition-transform duration-300 hover:scale-105'>
                <ProjectsCard title={project.title} 
                  description={project.description} 
                  image={project.image}              
                />
              </li> 
              
            ))}
          </ul>
          
        </div>
      <div>
      </div>
    </section>
  )
}
