import React from 'react';
// import { Button } from './Button';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

const Footer:React.FC = () => {
  return (
    <footer className='bg-[#25262A] h-auto text-white pt-10'>
      <div className='text-center grid gap-3'>
        <h1 className='font-sora text-3xl font-bold md:text-5xl'>
          Got an Awesome Idea? <br /> Let’s Talk With Us
        </h1>
        <p className='font-poppins font-[300] text-[13px]'>
          If you are confused or in doubt, you can freely contact us!
        </p>

        {/* Input + Button wrapper */}
        <div className='relative mx-auto w-full max-w-xs'>
          <input
            type='email'
            placeholder='Enter your email'
            className='w-full px-4 py-3 pr-28  rounded font-poppins bg-white text-gray-700 focus:outline-none text-sm'
          />
          <button
            className='absolute right-1 top-1 bottom-1 px-4 bg-[#0071E3] text-white font-sora text-[10px] md:text-sm cursor-pointer rounded-xl hover:bg-blue-600'
          >
            Subscribe
          </button>
        </div>
      </div>

      <div className='mt-5 ml-2 md:flex md:gap-5 md:justify-between md:m-5'>
        <div className='grid gap-10'>
          <div>
            <h1 className='font-sora'>Oluseed</h1>
            <p className='font-poppins font-[200] text-[13px]'>Empowering Brands, Igniting Creativity A Symphony of Innovation</p>
          </div>
          <div className='flex gap-5 mt-5'>
            <FaInstagram/>
            <FaX/>
            <FaLinkedin/>
            <FaYoutube/>
          </div>
        </div>
        
        <div className='mt-5 grid gap-5'>
          <div className='md:flex gap-10'>
            <h1 className='font-sora'>Quick Links</h1>
              <ul className='font-poppins font-[200] text-[13px] md:place-content-center md:grid md:gap-5'>
                <li>Home</li>
                <li>About Us</li>
                <li>Our Blog</li>
                <li>Our Work</li>
              </ul>
          </div>
          <div className='md:flex gap-10'>
            <h1 className='font-sora'>Legal Info</h1>
              <ul className='font-poppins font-[200] text-[13px] md:place-content-center md:ml-2.5'>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
          </div>
          <div className='md:flex gap-10 mb-2'>
            <h1 className='font-sora'>Contact</h1>
              <ul className='font-poppins font-[200] text-[13px] md:grid md:gap-5 md:ml-3'>
                <li>+62 1545 734 8996</li>
                <li>+62 1545 734 8996</li>
                <li>+62 1545 734 8996</li>
                <li>oluseed@gmail.com</li>
              </ul>
          </div>
        </div>
      </div>
      <div className='border-t font-sora  text-center font-light pb-2 pt-1'>
        <p>&copy; Oluseed All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer