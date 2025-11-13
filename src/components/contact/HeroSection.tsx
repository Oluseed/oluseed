import React from "react";
import { motion } from "framer-motion";
import herobg from "../../assets/images/workbg.png";
import icon1 from "../../assets/images/work-icon-1.svg";
import icon2 from "../../assets/images/work-icon-2.svg";
import icon3 from "../../assets/images/work-icon-3.svg";

export const HeroSection: React.FC = () => {
  // Variants for the container (parent)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3, // delay before child animations start
        staggerChildren: 0.2, // animate children one by one
      },
    },
  };

  // Variants for children (text, images, etc.)
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="w-full h-[400px] flex items-center justify-center"
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="bg-[#FFFFFF]/80 mx-4 py-5 px-1 sm:px-10 rounded-2xl place-self-center p-3 grid place-content-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="place-self-end" variants={itemVariants}>
          <img src={icon1} alt="icon" className="w-15 h-15" />
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center mb-3"
          variants={itemVariants}
        >
          <img
            src={icon2}
            alt="icon"
            className="w-15 h-15 absolute left-0 top-1 -translate-y-1/2"
          />
          <h1 className="font-clashDisplay capitalize text-center text-[#25262A] font-medium text-3xl sm:text-4xl md:text-5xl">
            Communicate <br /> your mind
            <span className="text-[#0f04ff]"> with us</span>
          </h1>
        </motion.div>

        <motion.p
          className="font-poppins text-[#4b4c4d] text-[14px] text-center md:text-[15px] md:px-20"
          variants={itemVariants}
        >
          We create and design applications, websites, or other <br /> digital
          products with professionalism
        </motion.p>

        <motion.div className="place-self-center mt-3" variants={itemVariants}>
          <img src={icon3} alt="icon" />
        </motion.div>
      </motion.div>
    </section>
  );
};
