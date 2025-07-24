import React from 'react';
import { motion } from 'framer-motion';
import client_1 from '../../assets/images/client-1.svg';
import client_2 from '../../assets/images/client-2.svg';
import client_3 from '../../assets/images/client-3.svg';

const Testimonial: React.FC = () => {
  const testimonials = [
    {
      image: client_1,
      name: 'Job Ghadzi',
      isCenter: false,
      role: 'CO-Founder DC agency',
      review: "The material is really updated, so I don't think I need to go to college, because here is enough"
    },
    {
      image: client_2,
      name: 'James Son',
      isCenter: true,
      role: 'Senior Entrepreneur',
      review: "Very different from conventional agency, this one is easier, easier to learn and easy to remember"
    },
    {
      image: client_3,
      name: 'James Son',
      isCenter: false,
      role: 'Senior Entrepreneur',
      review: "Again wfh like this it's not comfortable just learning via zoom at school"
    }
  ];

  return (
    <section className='pl-2'>
      <div>
        <h1 className='font-sora font-semibold text-3xl md:text-5xl mt-10 ml-2'>
          What Our
          <br />
          <span className='text-[#0071E3] font-bold'>Satisfied</span> Clients Say
        </h1>
      </div>

      <div className='grid md:flex md:mt-10 md:gap-4 lg:gap-10 md:m-5 lg:m-10'>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`${testimonial.isCenter ? 'bg-[#0071E3] text-white' : 'bg-white shadow-sm'} shadow-2xl m-5 sm:mx-30 md:mx-0 rounded-3xl p-7 grid place-content-center px-10 md:py-15`}
          >
            <div className='flex gap-3'>
              <img src={testimonial.image} alt="client-image" />
              <div className='mt-1'>
                <h1 className='font-sora font-[550] text-[16px] '>{testimonial.name}</h1>
                <h1 className='font-poppins font-[300] text-[13px]'>{testimonial.role}</h1>
              </div>
            </div>
            <p className='font-poppins mt-5 font-[400] text-[14px]'>
              {testimonial.review}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
