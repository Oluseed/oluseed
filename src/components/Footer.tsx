import React from 'react';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#25262A] text-white pt-10 px-4 md:px-20 font-poppins">
      {/* CTA Section */}
      <div className="text-center grid gap-3 max-w-2xl mx-auto">
        <h1 className="font-sora text-3xl font-bold md:text-5xl">
          Got an Awesome Idea? <br /> Let’s Talk With Us
        </h1>
        <p className="font-[300] text-[13px]">
          If you are confused or in doubt, you can freely contact us!
        </p>

        <div className="relative mx-auto w-full max-w-xs md:max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 pr-28 rounded font-poppins bg-white text-gray-700 focus:outline-none text-sm"
          />
          <button
            className="absolute right-1 top-1 bottom-1 px-4 bg-[#0071E3] text-white font-sora text-[10px] md:text-sm cursor-pointer rounded-xl hover:bg-blue-600"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mt-10 md:flex md:justify-between md:items-start md:gap-20">
        {/* Brand and Socials */}
        <div className="md:w-1/3 grid gap-6">
          <div>
            <h1 className="font-sora text-lg">Oluseed</h1>
            <p className="text-[13px] font-[200] leading-relaxed">
              Empowering Brands, Igniting Creativity — A Symphony of Innovation
            </p>
          </div>
          <div className="flex gap-5 text-lg">
            <FaInstagram />
            <FaX />
            <FaLinkedin />
            <FaYoutube />
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10 md:mt-0 text-[13px] font-[200]">
          <div>
            <h2 className="font-sora font-semibold mb-2">Quick Links</h2>
            <ul className="grid gap-2">
              <li>Home</li>
              <li>About Us</li>
              <li>Our Blog</li>
              <li>Our Work</li>
            </ul>
          </div>
          <div>
            <h2 className="font-sora font-semibold mb-2">Legal Info</h2>
            <ul className="grid gap-2">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h2 className="font-sora font-semibold mb-2">Contact</h2>
            <ul className="grid gap-2">
              <li>+62 1545 734 8996</li>
              <li>+62 1545 734 8996</li>
              <li>+62 1545 734 8996</li>
              <li>oluseed@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="border-t text-center font-sora text-sm font-light py-4 mt-10">
        <p>&copy; Oluseed. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
