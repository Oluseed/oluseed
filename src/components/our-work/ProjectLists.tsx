import React from 'react'
import { ProjectsCard } from '../ProjectsCard'
import project_image_1 from '../../assets/images/box-image-1.svg'
import { motion } from 'framer-motion'

export const ProjectLists: React.FC = () => {
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
    },
    {
      title: 'AR 3D Design Concept',
      description: 'AR creation with 3D design to solve problems with.',
      image: project_image_1
    },
    {
      title: 'AR 3D Design Concept',
      description: 'AR creation with 3D design to solve problems with.',
      image: project_image_1
    },
    {
      title: 'AR 3D Design Concept',
      description: 'AR creation with 3D design to solve problems with.',
      image: project_image_1
    },
  ]

  return (
    <div>
      <div>
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
      </div>
    </div>
  )
}
