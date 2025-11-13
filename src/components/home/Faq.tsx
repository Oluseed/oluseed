import React, { useState } from 'react';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDescription = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const datas = [
    {
      title: 'Do you work with businesses in all industries?',
      description:
        'The timeline for results varies depending on the scope of the project. For digital marketing efforts, you may start seeing improvements within a few months. Larger projects like business consulting or brand development.',
    },
    {
      title: 'How long does it take to see results?',
      description:
        'We measure success through key performance indicators (KPIs) such as revenue growth, customer engagement, lead generation, brand visibility.',
    },
    {
      title: 'What metrics do you use to measure success?',
      description:
        'We focus on client-specific goals, using KPIs like ROI, conversion rate, engagement rate, and brand reach.',
    },
    {
      title: 'Can you customize your services for my business?',
      description:
        'Absolutely. We tailor our services to fit your unique needs, industry, and growth goals.',
    },
    {
      title: 'What if I need ongoing support?',
      description:
        'We offer continuous support packages including monitoring, optimization, and performance reviews.',
    },
  ];

  return (
    <section className='pb-10'>
      <h1 className='font-clashDisplay font-semibold text-3xl mt-10 md:text-5xl text-center'>
        Frequently Asked <span className='text-[#0f04ff]'>Questions</span>
      </h1>

      <div className='mt-8 shadow-2xl pb-5 pt-5 rounded-2xl m-2 md:mx-30 lg:mx-60'>
        {datas.map((data, index) => (
          <div className='grid border-b m-3 p-1 mb-2' key={index}>
            <div
              className='flex justify-between items-center cursor-pointer'
              onClick={() => toggleDescription(index)}
            >
              <h1 className='font-poppins font-semibold text-[15px] md:text-[16px] lg:text-[18px]'>
                {data.title}
              </h1>
              <div>
                {openIndex === index ? (
                  <HiOutlineMinus size={26} color='#0f04ff' />
                ) : (
                  <HiOutlinePlus size={26} color='#0f04ff' />
                )}
              </div>
            </div>

            {/* Animated Answer */}
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='overflow-hidden'
                >
                  <p className='font-poppins text-[#05131DB2] font-normal mb-5 text-[13px] md:text-[14px] py-2'>
                    {data.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
