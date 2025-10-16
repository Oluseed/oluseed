import React from "react";
import FilterBar from "./FilterBar";

const PostsPage: React.FC = () => {
  const [postCategory, setPostCategory] = React.useState<string>("All Posts");

  return (
    <div className="mt-5 mb-5 px-3 sm:px-10">
      {/* Heading + FilterBar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        {/* Post Category */}
        <h1 className="font-clashDisplay text-[#000000] font-medium text-sm sm:text-base text-center sm:text-left">
          "{postCategory}"
        </h1>

        {/* FilterBar */}
        <div className="w-full sm:w-auto">
          <FilterBar setPostCategory={setPostCategory} />
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
