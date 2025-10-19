import React, { useState } from "react";

interface JobsFilterBarProps {
  setCurrentJobSelect: React.Dispatch<React.SetStateAction<string>>;
}

const JobsFilterBar: React.FC<JobsFilterBarProps> = ({ setCurrentJobSelect }) => {
  const departments = [
    "All Departments",
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "Customer Operations",
  ];

  const [activeDepartment, setActiveDepartment] = useState<string>("All Departments");

  const handleSelect = (department: string) => {
    setActiveDepartment(department);
    setCurrentJobSelect(department);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-6">

      {/* ✅ Horizontal Flex Layout */}
      <div
        className="
          flex 
          gap-3 
          overflow-x-auto 
          scrollbar-hide 
          py-2 
          sm:justify-center
        "
      >
        {departments.map((department) => (
          <button
            key={department}
            onClick={() => handleSelect(department)}
            className={`
              flex-shrink-0
              px-5 
              py-2.5 
              text-sm 
              sm:text-base 
              rounded-full 
              font-medium 
              border 
              transition-all 
              duration-300 
              ${
                activeDepartment === department
                  ? "bg-[#191919] text-white border-[#191919]"
                  : "bg-white text-[#191919] border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {department}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobsFilterBar;
