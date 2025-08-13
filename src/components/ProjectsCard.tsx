import React from 'react';
import NavArrow from '../assets/images/Group 5.svg'
import { Link } from 'react-router';

type ProjectProps = {
  title: string;
  description: string;
  image: string;
};


export const ProjectsCard: React.FC<ProjectProps> = ({ 
  title,
  description,
  image,
}) => {
  return (
    <div 
      className='h-70 w-80 rounded-3xl grid justify-between gap-10 mt-5 md:hover:scale-100 md:h-90 '
      style={{ backgroundImage: `url(${image})` }}>
      <Link to='/'>
        <div className='place-self-end  bg-white m-3 p-5 rounded-full'>
          <img src={NavArrow} alt="Go to project page" />
        </div>
      </Link>
      <div className='bg-white rounded-2xl h-auto grid place-content-center mb-3 mx-2 px-3 md:h-25 md:place-self-end'>
        <h1 className='font-bold text-xl'>{title}</h1>
        <p className='font-poppins font-light text-[15px] mt-2'>{description}</p>
      </div>
    </div>
    
  );
};
