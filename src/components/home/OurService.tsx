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
  return (
    <section className='bg-[#FFF8EF] h-full grid font-clashDisplay pb-4'>

      {/* Top Stats Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className='bg-[#25262A] mt-4 pt-7 pb-10 place-self-center shadow-2xs text-white rounded-3xl h-auto grid font-sora md:mt-1 md:absolute top-100 md:px-5 md:py-5 lg:px-12 lg:py-7'
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

      {/* Service Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='grid ml-2 mt-5 md:mt-50 md:mx-2'
      >
        <div className='flex justify-between mb-5'>
          <div className='grid gap-2'>
            <h1 className='font-semibold text-3xl md:text-5xl'>What We Serve</h1>
            <h1 className='font-semibold text-3xl text-[#0071E3] md:text-5xl'>For Your Business</h1>
          </div>
          {/* <button className='hidden md:block bg-[#0071E3] rounded-xl px-3 text-white place-self-center font-sora text-sm h-12 hover:bg-blue-500 cursor-pointer'>Our Portfolio</button> */}
        </div>

        <div className='grid grid-cols-1 place-self-center md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 '>
          {[
            {
              svg: svg_1,
              title: "Graphics Design",
              desc: "Product that have a good appearance can attract users",
              dark: false,
            },
            {
              svg: svg_2,
              title: "UIUX",
              desc: "Crafting seamless experiences in pixels: Where creativity meets functionality.✨",
              dark: true,
            },
            {
              svg: svg_3,
              title: "Web Development",
              desc: "Transforming ideas into interactive realities. 🚀💻 Crafting flawless websites that speak volumes.",
              dark: false,
            },
            {
              svg: svg_4,
              title: "Digital Marketing",
              desc: "Elevating brands in the digital realm. 🚀✨ Crafting compelling narratives, fostering connections, and driving results.",
              dark: false,
            },
            {
              svg: svg_5,
              title: "ICT Training",
              desc: "Empowering minds in the digital age: Unlocking the potential of tomorrow's leaders through ICT training. 💻🌐. available for online and onsite for kids, teenagers,adult training and organization training",
              dark: false,
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className={`${item.dark ? 'bg-[#0071E3] text-white' : 'bg-white'} grid gap-2 rounded-3xl w-70 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 md:w-80 md:py-7`}
            >
              <img src={item.svg} alt={item.title} className='w-10 h-15 md:w-17 md:h-20 md:mb-3'/>
              <h1 className='font-semibold md:text-xl font-poppins'>{item.title}</h1>
              <p className={`font-poppins font-[200] text-[14px] leading-6 ${item.dark ? 'text-[#f3f3f3]' : 'text-gray-500'}`} style={{ fontWeight: "400" }}>
                {item.desc}
              </p>
              <div className='flex mt-3 items-center gap-2 font-light cursor-pointer hover:underline'>
                <a href="/contact" className={'font-clashDisplay font-medium'}>Contact Us</a>
                <FaArrowRight className='inline ml-2 font'/>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default OurService