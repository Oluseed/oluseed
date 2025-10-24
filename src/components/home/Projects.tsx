import React from 'react'
import { Button } from '../Button'
import project_image_1 from '../../assets/images/box-image-1.svg'
import { ProjectsCard } from '../ProjectsCard'
import { motion } from 'framer-motion'

const Projects: React.FC = () => {
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

  return (
    <section className='bg-[#ffffff] h-full grid font-clashDisplay mt-4 p-2 lg:p-5'>
      <motion.div
        className='grid'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className='flex justify-between'>
          <div className='grid'>
            <h1 className='text-3xl font-semibold sm:text-2xl md:text-3xl lg:text-5xl'>Projects We</h1>
            <h1 className='text-3xl font-semibold sm:text-2xl md:text-3xl lg:text-5xl'>
              have <span className='text-[#0071E3]'>Completed</span>
            </h1>
          </div>
          <div className='hidden md:flex md:items-center md:gap-2'>
            <a href="/contact">
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
            </a>
            <a href="/works">
              <Button
                text='View all work'
                className="
                  bg-[#0071E3] text-white 
                  shadow-md px-3
                  py-2 rounded-xl
                  font-[400] text-[10px] 
                  sm:text-sm lg:text-base
                  lg:cursor-pointer
                "
              />
            </a>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.ul
          className='grid grid-cols-1 place-self-center md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {projectLists.map((project, index) => (
            <motion.li
              key={index}
              className='transform transition-transform cursor-pointer duration-300 hover:scale-105'
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <ProjectsCard
                title={project.title}
                description={project.description}
                image={project.image}
              />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}

export default Projects