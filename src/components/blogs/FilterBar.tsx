import React, { useState } from "react";
import { FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";

interface FilterBarProps {
  setBlogCategory: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setBlogCategory }) => {
  const [query, setQuery] = useState("");

  const handleFilter = () => {
    {query.trim() !== "" && setBlogCategory(`${query}`)};
    console.log("Filtering results for:", query);
  };

  return (
    <div className="relative w-full sm:w-[450px] md:w-[600px] ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleFilter()}
        placeholder="Search by category..."
        className="w-full border font-poppins shadow text-sm font-medium border-[#F0F0F0] rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
      />

      {/* Left: Search Icon */}
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-600" />
      
      {/* Right: Filter Icon  and Reset Button */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
        <button
          onClick={() => {
            setBlogCategory("All Posts");
            setQuery("");

          }}
          className=" bg-[#0071E3] text-white px-2 py-1 rounded-md hover:bg-blue-900 transition-colors cursor-pointer"
        >
          <FiRefreshCw />
        </button>
        <button
          onClick={handleFilter}
          className=" text-lg text-gray-800 hover:text-[#0f04ff] transition-colors cursor-pointer"
        >
          <FiFilter />
        </button>
      </div>
      
    </div>
  );
};

export default FilterBar;
