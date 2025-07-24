import React from 'react';
import image_1 from '../../assets/images/Bubble 2.svg';
import image_2 from '../../assets/images/Bubble 4.svg';
import image_3 from '../../assets/images/Bubble 5.svg';
import why_oluseed_image from '../../assets/images/why-oluseed-image.svg';
import {motion} from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const WhyOluseed: React.FC = () => {

  const datas = [
    {
      image: image_1,
      heading: 'Proven Result',
      description: 'We deliver measurable outcomes that drive growth. Our track record of successful projects and satisfiedclients speaks volumes about our ability to turn challenges into opportunities.'
    },
    {
      image: image_2,
      heading: 'Expertise and Experience',
      description: 'With years of industry experience, our team brings deep knowledge and innovative solutions to every project, ensuring your business benefits from cutting-edge strategies and best practices.'
    },
    {
      image: image_3,
      heading: 'Data-Driven Decisions',
      description: 'We use analytics and reporting to make data-driven decisions that drive results for your business.'
    }
  ]

  return (
    <section className='bg-[#FFF8EF] flex flex-col-reverse pb-4 md:flex-row md:p-20 md:gap-5 lg:gap-10'>
      {/* IMAGE */}
      <motion.div
        className='mt-7 place-self-center'
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <img src={why_oluseed_image} alt="image" className='w-70 md:w-150' />
      </motion.div>

       {/* TEXT SECTION */}
      <motion.div
        className='grid ml-3 pt-3 lg:flex lg:flex-col lg:gap-5'
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h6 className='font-poppins text-[#0071E3] font-[500] uppercase lg:text-xl'>
          Why Choose Us
        </h6>

        <h1 className='font-sora text-[#030D03] mt-3 font-[600] text-4xl lg:text-5xl'>
          The Benefits of working with us
        </h1>

        {/* BENEFIT CARDS */}
        <div className='grid mt-4 gap-6'>
          {datas.map((data, index) => (
            <motion.div
              key={index}
              className='flex gap-3 lg:gap-6'
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={data.image}
                alt="Image"
                className='w-15 h-15 lg:w-20 lg:h-20'
              />
              <div className='grid gap-2'>
                <h1 className='text-[#0071E3] font-poppins font-[500] text-[15px] lg:text-xl'>
                  {data.heading}
                </h1>
                <p className='font-poppins font-[200] text-[13px] pr-1 lg:font-[400] lg:text-[14px]'>
                  {data.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
    </section>
  )
}

export default WhyOluseed