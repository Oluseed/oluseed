import React from "react";
import { ProjectsCard } from "../ProjectsCard";
import { motion } from "framer-motion";
// import project_image_1 from "../../assets/images/box-image-1.svg";
import speakafricans_image from "../../assets/images/speakafricans.png";
import ekoglass from "../../assets/images/ekoglass.png";
import olastute from '../../assets/images/olastute.png';
import nba from '../../assets/images/nba.png';
import nursing from '../../assets/images/nursing.png';
import oshtrack from '../../assets/images/oshtrack.png';
import recyling from '../../assets/images/recycling.png';
import remitex from '../../assets/images/remitex.png';
import sameace from '../../assets/images/samace.png';
import studentgrading from '../../assets/images/studentgrading.png';
import vechule from '../../assets/images/vechule.png';
import thuram from "../../assets/images/thuram.png"

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const ProjectLists: React.FC = () => {
  const projectLists: ProjectItem[] = [
    {
      title: "SpeakAfricans",
      description:
        "A platform for learning African languages deeply — built with community-driven AI learning.",
      image: speakafricans_image,
      link: "https://speakafricans.com",
    },
    {
      title: "Olastute Inventory System",
      description:
        "A complete inventory system for businesses managing stock, sales, and records.",
      image: olastute,
      link: "https://olavent.netlify.app",
    },
    {
      title: "Eko Glass Software",
      description:
        "A custom-built office management solution for a Canadian-based glass company.",
      image: ekoglass,
      link: "http://portal.ekoglass.com.ng/",
    },
    {
      title: "Thuram Healthcare",
      description:
        "A healthcare management system with staff recruitment and hospital operations tools.",
      image: thuram,
      link: "https://thuramhealthcare.ca/",
    },
    {
      title: "Recycling Management System",
      description:
        "A recycling workflow management system built for optimized waste processing.",
      image: recyling,
      link: "https://gjc-delta.vercel.app/",
    },
    {
      title: "Nursing Spectrum",
      description:
        "A job-booking platform for nurses seeking international employment opportunities.",
      image: nursing,
      link: "https://nursingspectrum.com/",
    },
    {
      title: "Oshus Freight Services",
      description:
        "A courier and logistics system for parcel management in South Africa.",
      image: oshtrack,
      link: "https://courier.oshusfreightservices.com/",
    },
    {
      title: "NBA Osogbo E-Voting System",
      description:
        "A secured online e-voting platform for the Nigerian Bar Association.",
      image: nba,
      link: "https://vote.nbaosogbo.org/",
    },
    {
      title: "Remitex Fintech",
      description:
        "A multi-platform fintech remittance solution still under development.",
      image: remitex,
      link: "https://remitex.co",
    },
    {
      title: "Student Result Management",
      description:
        "A complete result management system built for polytechnics and colleges.",
      image: studentgrading,
      link: "https://srms.wetfieldinc.com/",
    },
    {
      title: "Vehicle Docs Renewal System",
      description:
        "A platform to simplify license renewal, vehicle papers, and documentation.",
      image: vechule,
      link: "https://vehicle-docs-app.onrender.com/admin/login",
    },
    {
      title: "Industrial HR & Office System",
      description:
        "A tailored HR & management system for a pharmaceutical company.",
      image: sameace,
      link: "https://samace-2-0.vercel.app/login",
    },
  ];

  return (
    <div className="w-full px-2 md:px-5 lg:px-10">
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {projectLists.map((project, index) => (
          <motion.li
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.85, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="transform transition-transform hover:scale-[1.03] cursor-pointer"
          >
            <ProjectsCard
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
