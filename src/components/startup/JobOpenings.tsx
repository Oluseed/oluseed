import React from 'react'
import JobsFilterBar from './JobsFilterBar';
import { jobs } from '../../data/jobs';
import JobListings from './JobListings';

const JobOpenings:React.FC = () => {
  
  const [currentJobSelect, setCurrentJobSelect] = React.useState<string>('All Departments');
  const filteredJobs = currentJobSelect === 'All Departments' 
    ? jobs : jobs.filter((job) => job.department === currentJobSelect);

  return (
    <div className="mt-5 mb-5 px-3 sm:px-10">
      <h1 className='font-clashDisplay font-medium text-2xl text-center sm:text-4xl md:text-5xl'>Current job openings</h1>
      <p className='font-poppins font-normal text-[#363E7A] capitalize text-center mt-3 sm:text-xl'>filter by department</p>

      {/* Filter Section */}
      <div>
        <JobsFilterBar setCurrentJobSelect={setCurrentJobSelect}/>
      </div>

      {/* Job Listings Section */}
      <div>
        {filteredJobs.length > 0 ? <JobListings jobs={filteredJobs}/> : 
          <div className='mt-10'>
            <h1 className='my-10 font-clashDisplay font-medium text-3xl text-center'>Sorry no job listing is available for that department</h1>
          </div>
        }
        
      </div>
    </div>
  )
}

export default JobOpenings