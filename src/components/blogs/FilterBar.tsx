import React, { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

interface FilterBarProps {
  setPostCategory: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setPostCategory }) => {
  const [query, setQuery] = useState("");

  const handleFilter = () => {
    {query.trim() !== "" && setPostCategory(`Showing results for ${query}`)};
    console.log("Filtering results for:", query);
  };

  return (
    <div className="relative w-full sm:w-[300px]">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleFilter()}
        placeholder="Search by..."
        className="w-full border font-poppins shadow text-sm font-medium border-[#F0F0F0] rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
      />

      {/* Left: Search Icon */}
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-600" />

      {/* Right: Filter Icon */}
      <button
        onClick={handleFilter}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-800 hover:text-[#0071E3] transition-colors"
      >
        <FiFilter />
      </button>
    </div>
  );
};

export default FilterBar;
