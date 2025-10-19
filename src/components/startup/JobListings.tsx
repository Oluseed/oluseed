import React from 'react'

interface JobListingsProps {
  id: number;
  title: string;
  department: string;
  role: string;
}

interface JobsProps {
  jobs: JobListingsProps[];
}

const JobListings: React.FC<JobsProps> = ({ jobs }) => {
  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id} className="bg-[#F8FDF9] mt-5 mb-4 p-2 rounded-lg shadow-sm flex justify-between md:mx-10">
          <div className='grid '>
            <h1 className='font-clashDisplay font-medium text-sm md:text-xl'>{job.title}</h1>
            <p className='font-inter font-light text-[13px]'>{job.department}</p>
          </div>
          {/* Role */}
          <h3 className='hidden sm:block font-inter font-normal'>{job.role}</h3>
          {/* Apply */}
          <button className='bg-[#0071E3] cursor-pointer text-white font-poppins font-medium text-[11px] px-10 rounded-lg'>
            Apply
          </button>
        </div>
      ))} 
    </div>
  )
}

export default JobListings