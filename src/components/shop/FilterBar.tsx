import React from "react";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="
          flex 
          gap-3 
          overflow-x-auto 
          scrollbar-hide 
          py-2 
          px-3
          sm:justify-center
        "
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 cursor-pointer shadow text-[#5E5E5E] rounded-full font-inter font-medium text-sm bg-[#F3EFEF] transition-all duration-100 whitespace-nowrap ${
            selectedCategory === category
              ? "border-2 border-[#FF4C05] text-[#FF4C05]"
              : ""
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
