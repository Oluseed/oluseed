import React from 'react'
import image_1 from '../../assets/about-us-1.png'
import image_2 from '../../assets/about-us-1.png'

export const Section3 : React.FC = () => {
  return (
    <div className='grid place-content-center'>
      <div className='p-3 grid gap-y-4 mt-10 md:mt-30'>
        <h1 className='font-clashDisplay text-3xl font-medium md:text-5xl'> Unraveling Success <span className='text-[#0071E3]'>Through Phenomenal Technology & Strategic Expertise</span></h1>
        <p className='text-[#424242] font-poppins text-sm font-normal' >
          What fuels our confidence and drives our success? A powerhouse team and cutting-edge tools, 
          all dedicated to delivering top-tier web development,
          design, marketing, and custom software solutions. 
          We don’t just build websites, we position businesses at the top of the market.
        </p>
        {/* Images */}
        <div className='grid gap-4 md:grid-cols-2 place-content-center sm:mx-3 md:place-self-center'>
          <div className='h-70 w-80 md:w-100 md:h-100'>
            <img src={image_1} alt="image" className='' />
          </div>
          <div className='h-70 w-80 md:w-100 md:h-100'>
            <img src={image_2} alt="image" />
          </div>
        </div>
      </div>
    </div>
  )
}
