import { motion } from 'framer-motion'
import React from 'react'
import image_1 from '../../assets/images/Group 5.svg'

export const Section2: React.FC = () => {
  const content = [
    {
      title: 'Mission',
      description:
        'To empower businesses with cutting-edge web solutions that drive growth, enhance brand visibility, and foster meaningful customer engagement.'
    },
    {
      title: 'Vision',
      description:
        'To be the leading digital solutions provider, renowned for transforming brands into dominant forces in the online space through innovation and excellence.'
    }
  ]

  return (
    <section className="bg-[#FFF8EF] py-16 md:py-24 px-6 md:px-16 lg:px-24 font-poppins">
      {/* Text Content */}
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-clashDisplay text-[#25262A] font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6"
        >
          IT Solution With Years of Experience
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[#4b4c4d] text-[15px] md:text-[17px] leading-8 md:leading-9 text-justify md:px-10"
        >
          Oluseed Technologies Limited (RC 1664920) is a Technology-based company, started in
          2016 as a full robotic company and subsequently registered in corporate affairs
          commission in March 5, 2020 as a Technology Company that deals with Website Design,
          Website Development, App Design, App Development, Software Application, Data Science,
          Game Design, Networking, Cybersecurity Services, Digital Marketing, Cartoon Animation,
          Robotic Programming, Embedded Systems, Idea Project Management, Start-Up Services (SUS),
          Solar Panel Installation, CCTV, Sales of Computer and Electronics Gadgets, Branding and
          Rebranding Services, Capacity Building, ICT Project Management, Networking, and General
          ICT Services by maintaining efficiencies in our operations and focusing on solving ICT
          problems globally.
        </motion.p>
      </div>

      {/* Mission / Vision Cards */}
      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
        {content.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all p-8 flex flex-col gap-3"
          >
            <h2 className="font-clashDisplay font-semibold text-2xl md:text-3xl text-[#25262A] flex items-center gap-2">
              <span className="text-[#0f04ff] text-5xl leading-none">•</span>
              {item.title}
            </h2>
            <p className="text-[#4b4c4d] text-[15px] md:text-[17px] leading-7">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-[#25262A] mt-20 pt-10 pb-12 rounded-3xl text-white shadow-xl max-w-6xl mx-auto px-6 md:px-10"
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-14">
          {/* Card 1 */}
          <div className="bg-[#0f04ff] rounded-3xl px-6 py-6 md:py-8 text-center w-[180px] md:w-[220px]">
            <div className="flex justify-center items-center mb-3">
              <img src={image_1} alt="arrow" className="w-6 md:w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-clashDisplay">50K+</h1>
            <p className="text-sm md:text-base mt-1 font-medium">Satisfied Clients</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white text-black rounded-3xl px-6 py-8 text-center w-[180px] md:w-[220px] shadow-sm">
            <h1 className="text-3xl md:text-4xl font-extrabold font-clashDisplay">13+</h1>
            <p className="text-sm md:text-base mt-2 font-medium">Years Experience</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white text-black rounded-3xl px-6 py-8 text-center w-[180px] md:w-[220px] shadow-sm">
            <h1 className="text-3xl md:text-4xl font-extrabold font-clashDisplay">20</h1>
            <p className="text-sm md:text-base mt-2 font-medium">Professional Designers</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white text-black rounded-3xl px-6 py-8 text-center w-[180px] md:w-[220px] shadow-sm">
            <h1 className="text-3xl md:text-4xl font-extrabold font-clashDisplay">10K</h1>
            <p className="text-sm md:text-base mt-2 font-medium">Digital Products</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
