import React from "react";
import { Link } from "react-router-dom";
import NavArrow from "../assets/images/Group 5.svg";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const ProjectsCard: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <div
      className="rounded-3xl overflow-hidden shadow-xl bg-cover bg-center h-[380px] grid justify-between border border-gray-200"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Link to={link} target="_blank" rel="noopener noreferrer">
        <div className="place-self-end bg-white m-3 p-4 rounded-full shadow-md hover:shadow-lg transition">
          <img src={NavArrow} alt="Open project" className="w-5 h-5" />
        </div>
      </Link>

      <div className="bg-white bg-opacity-95 rounded-2xl p-4 mx-3 mb-3 shadow-sm">
        <h1 className="font-bold text-lg font-clashDisplay text-black">
          {title}
        </h1>
        <p className="font-poppins text-sm mt-2 text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
};
