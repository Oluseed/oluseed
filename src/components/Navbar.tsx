import React from 'react'
import { FaBars, FaChevronDown } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { NavLink } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'

export const Navbar: React.FC = () => {
  const [ismenuOpen, setIsMenuOpen] = React.useState(false)

  // show menubar 
  function showMenu () {
    setIsMenuOpen(!ismenuOpen)
  }

  return (
    <nav className='bg-[#ffffff] py-3 shadow-md flex justify-between items-center pr-2'>
      <div className='flex items-center justify-between w-full max-w-6xl mx-auto'>
        {/* Logo */}
        <NavLink to="/" className="items-center p-3 ml-3 bg-[#D9D9D9] font-sora">
          Oluseed
        </NavLink>
        {/* Mobile View */}
        <div onClick={showMenu} className='md:hidden'>
          {!ismenuOpen && <FaBars className="text-[#000000] text-2xl cursor-pointer mr-3" />}
        </div>

        {/* Desktop View */}
        <div className='hidden md:block font-clashDisplay'>
          <ul className="flex gap-10">
            <li className='place-self-center'>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? "font-semibold text-sm text-[#25262A]" : "text-[#25262A] font-extralight text-[12px] hover:font-normal hover:text-[#0071e3]"
                }
              >
                <div className='flex text-center place-content-center gap-2'>
                  Home 
                  <span className='mt-1'>
                    <FaChevronDown className='hover:scale-110 transition-transform' />
                  </span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/works" 
                className={({ isActive }) => 
                  isActive ? "font-semibold text-sm text-[#25262A]" : "text-[#25262A] font-extralight text-[12px] hover:text-[#0071E3] hover:font-normal"
              }
              >
                Our Works
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive ? "font-semibold text-sm text-[#25262A]" : "text-[#25262A] font-extralight text-[12px] hover:text-[#0071E3] hover:font-normal"
              }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/blogs" 
                className={({ isActive }) => 
                  isActive ? "font-semibold text-sm text-[#25262A]" : "text-[#25262A] font-extralight text-[12px] hover:text-[#0071E3] hover:font-normal"
              }
              >
                Our Blog
              </NavLink>
            </li> 
            <li>
              <NavLink 
                to="/startup" 
                className={({ isActive }) => 
                  isActive ? "font-semibold text-sm text-[#25262A]" : "text-[#25262A] font-extralight text-[12px] hover:text-[#0071E3] hover:font-normal"
              }
              >
                Start up
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/product" 
                className={({ isActive }) => 
                  isActive ? "font-semibold text-sm text-[#25262A]" : "text-[#25262A] font-extralight text-[12px] hover:text-[#0071E3] hover:font-normal"
              }
              >
                Our product
              </NavLink>
            </li>         
          </ul>
        </div>
          <div className='hidden md:block'>
            <NavLink to={'/contact'}>
                <Button
                  text='Contact Us'
                  className='bg-[#0071E3] rounded-xl px-6 py-3.5 cursor-pointer flex text-center md:block font-clashDisplay text-white'
                />
            </NavLink>
            
          </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {ismenuOpen && (
           <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-screen h-full bg-[#FFFFFF] p-4 z-40 md:hidden"
          >
            <FaXmark className='place-self-end text-[#000000] text-3xl cursor-pointer mr-3' onClick={showMenu}/>
            <div className='mt-20 font-clashDisplay place-self-center'>
              <ul className="flex flex-col gap-15 justify-between text-center">
                <li>
                  <NavLink 
                    to="/" 
                    onClick={showMenu}
                    className={({ isActive }) => 
                      isActive ? "font-semibold text-xl text-[#25262A]" : "text-[#25262A] font-extralight text-xl"
                  }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/works" 
                    onClick={showMenu}
                    className={({ isActive }) => 
                      isActive ? "font-semibold text-xl text-[#25262A]" : "text-[#25262A] font-extralight text-xl"
                  }
                  >
                    Our Works
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    onClick={showMenu}
                    to="/about" 
                    className={({ isActive }) => 
                      isActive ? "font-semibold text-xl text-[#25262A]" : "text-[#25262A] font-extralight text-xl"
                  }
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    onClick={showMenu}
                    to="/blogs" 
                    className={({ isActive }) => 
                      isActive ? "font-semibold text-xl text-[#25262A]" : "text-[#25262A] font-extralight text-xl"
                  }
                  >
                    Our Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    onClick={showMenu}
                    to="/startup" 
                    className={({ isActive }) => 
                      isActive ? "font-semibold text-xl text-[#25262A]" : "text-[#25262A] font-extralight text-xl"
                  }
                  >
                    Start up
                  </NavLink>
                </li>
                <li>
                  <Button
                    onClick={showMenu}
                    text='Contact Us'
                    className='bg-[#0071E3] rounded-xl px-10 py-4 flex text-center text-white'
                  />
                </li>                  
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </nav>
  )
}
