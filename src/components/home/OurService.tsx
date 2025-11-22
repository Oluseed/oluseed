import React from 'react'
import { motion } from 'framer-motion'
import svg_1 from '../../assets/images/Icon UX.svg'
import svg_2 from '../../assets/images/Icon Logo.svg';
import svg_3 from '../../assets/images/Icon Illustration.svg'
import image_1 from '../../assets/images/Group 5.svg'
import svg_4 from '../../assets/images/Icon Digital Painting.svg'
import svg_5 from '../../assets/images/Icon 3D.svg'
import { FaArrowRight } from 'react-icons/fa'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 }
  })
}

const OurService: React.FC = () => {
  const services = [
    { svg: svg_1, title: "Graphics Design", desc: "Product that has great visual appeal to attract users." },
    { svg: svg_2, title: "UI/UX Design", desc: "Crafting seamless experiences in pixels." },
    { svg: svg_3, title: "Web Design & Development", desc: "Transforming ideas into world-class websites." },
    { svg: svg_3, title: "Mobile App Development", desc: "Apps designed for performance and usability." },
    { svg: svg_4, title: "Software Development", desc: "Building powerful and scalable digital tools." },
    { svg: svg_4, title: "Cloud Computing", desc: "Reliable cloud infrastructure & operations." },
    { svg: svg_5, title: "Digital Marketing", desc: "Amplifying your brand visibility." },
    { svg: svg_5, title: "Cyber Security", desc: "Protecting your digital assets with modern tools." },
    { svg: svg_5, title: "Data Science", desc: "Transforming data into meaningful insights." },
    { svg: svg_5, title: "Project Management", desc: "Delivering successful project outcomes." },
    { svg: svg_5, title: "ICT Training", desc: "Professional tech training for all ages." }
  ];

  return (
    <section className='bg-[#FFF8EF] h-full grid font-clashDisplay pb-4'>

      {/* Stats Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className='bg-[#25262A] mt-4 pt-7 pb-10 place-self-center shadow-2xs text-white rounded-3xl h-auto grid font-sora
        md:mt-1 md:absolute top-100 md:px-5 md:py-5 lg:px-12 lg:py-7'
      >
        <div className='flex flex-col gap-3 mt-3 md:flex-row md:place-content-center lg:gap-3'>
          <div className='bg-[#0f04ff] mx-10 rounded-4xl w-50 p-3 place-self-center md:mx-0 md:w-50 md:gap-5 lg:w-70'>
            <div className='flex justify-between md:mt-2'>
              <div className='grid place-content-center md:ml-5'>
                <h1 className='text-2xl font-extrabold md:text-3xl font-clashDisplay'>200</h1>
                <p className='text-[12px] font-medium'>Satisfied clients</p>
              </div>
              <div className='bg-white rounded-full flex place-content-center w-10 h-10 md:w-15 md:h-15'>
                <img src={image_1} alt='arrow' className='w-5' />
              </div>
            </div>
            <p className='font-poppins text-[12px] mt-4 md:ml-4.5 md:pb-3'>
              Our awesome clients are industry experts around the world.
            </p>
          </div>

          {/* Stats items */}
          {[{ num: "9+", label: "Years Experience" },
            { num: "20", label: "Professional Designer" },
            { num: "1K", label: "Digital Product" }
          ].map((stat, i) => (
            <div key={i} className='bg-[#0f04ff] place-self-center py-10 rounded-4xl grid place-content-center w-50 md:w-40'>
              <h1 className='text-3xl font-extrabold text-center font-clashDisplay'>{stat.num}</h1>
              <p className='font-poppins text-center mt-2 text-sm font-medium'>{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='grid ml-2 mt-5 md:mt-50 md:mx-2'
      >
        <div className='grid gap-2 mb-5'>
          <h1 className='font-semibold text-3xl md:text-5xl'>What We Serve</h1>
          <h1 className='font-semibold text-3xl text-[#0f04ff] md:text-5xl'>For Your Business</h1>
        </div>

        {/* Service Cards */}
        <div className='grid grid-cols-1 place-self-center md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
          {services.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className={`
                group relative rounded-3xl w-70 p-4 md:w-80 md:py-7 shadow-lg transition-all duration-300 cursor-pointer
                bg-[#0f04ff] text-white 
                hover:bg-white hover:text-[#0f04ff] hover:shadow-xl
              `}
            >
              <img
                src={item.svg}
                alt={item.title}
                className='w-10 h-15 md:w-17 md:h-20 md:mb-3
                filter brightness-200 group-hover:brightness-0 transition'
              />

              <h1 className='font-semibold md:text-xl font-poppins'>
                {item.title}
              </h1>

              <p className='font-poppins text-[14px] leading-6 text-gray-200 group-hover:text-gray-600'>
                {item.desc}
              </p>

              <div className='flex mt-3 items-center gap-2'>
                <a href="/contact" className='font-clashDisplay font-medium'>
                  Contact Us
                </a>
                <FaArrowRight className='inline ml-2 group-hover:text-[#0f04ff]' />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default OurService
