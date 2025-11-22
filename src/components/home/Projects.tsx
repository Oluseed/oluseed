import React from 'react'
import { Button } from '../Button'
import speakafricans_image from '../../assets/images/speakafricans.png'
import ekoglass from '../../assets/images/ekoglass.png'
import project_image_1 from '../../assets/images/box-image-1.svg'
import { ProjectsCard } from '../ProjectsCard'
import { motion } from 'framer-motion'

const Projects: React.FC = () => {
  const projectLists = [
    {
      title: 'SpeakAfricans',
      description:
        'SpeakAfricans is a platform where users can learn African languages from the grassroots using AI-powered tools. It started as a personal idea and evolved into a company project currently under development.',
      image: speakafricans_image,
      link: 'https://speakafricans.com'
    },
    {
      title: 'Olastute Inventory System',
      description:
        'Olastute is an inventory management system built for stores and companies that buy and sell goods. Version one tracks stock efficiently. The second version is in development with a full admin dashboard.',
      image: project_image_1,
      link: 'https://olavent.netlify.app/'
    },
    {
      title: 'Eko Glass Software',
      description:
        'A customized office management system for a company based in Canada. It streamlines administrative processes and ensures efficient workflow management.',
      image: ekoglass,
      link: 'http://portal.ekoglass.com.ng/'
    }
  ]

  return (
    <section className="bg-[#ffffff] h-full grid font-clashDisplay mt-4 p-4 lg:p-6">
      <motion.div
        className="grid"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">Projects We</h1>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
              Have <span className="text-[#0f04ff]">Completed</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="/contact">
              <Button
                text="Start New Project"
                className="
                  hidden sm:block bg-white shadow-md 
                  px-4 py-2 rounded font-medium 
                  text-sm lg:text-base hover:shadow-lg
                "
              />
            </a>

            <a href="/works">
              <Button
                text="View All Work"
                className="
                  bg-[#0f04ff] text-white shadow-md px-4 py-2 rounded-xl 
                  font-medium text-sm lg:text-base
                "
              />
            </a>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 place-self-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {projectLists.map((project, index) => (
            <motion.li
              key={index}
              className="transform transition-transform duration-300 hover:scale-105"
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
            >
              <ProjectsCard {...project} />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}

export default Projects
