import React from 'react'
import { Link } from 'react-router'
import NavArrow from '../assets/images/Group 5.svg'

type ProjectProps = {
  title: string
  description: string
  image: string
  link: string
}

export const ProjectsCard: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  link
}) => {
  return (
    <div
      className="rounded-3xl overflow-hidden shadow-lg bg-cover bg-center h-[380px] w-full grid justify-between"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Top arrow */}
      <Link to={link} target="_blank" rel="noopener noreferrer">
        <div className="place-self-end bg-white m-3 p-4 rounded-full shadow-sm hover:shadow-md transition">
          <img src={NavArrow} alt="Open project" className="w-5 h-5" />
        </div>
      </Link>

      {/* Description section */}
      <div className="bg-white bg-opacity-95 rounded-2xl p-4 mx-3 mb-3">
        <h1 className="font-bold text-lg font-clashDisplay">{title}</h1>
        <p className="font-poppins font-light text-sm mt-2 text-[#25262A]">
          {description}
        </p>
      </div>
    </div>
  )
}
