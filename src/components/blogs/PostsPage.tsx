import React from "react";
import FilterBar from "./FilterBar";
import { blogs } from "../../data/blogs";
import { PostsCard } from "./PostsCard";

const PostsPage: React.FC = () => {
  const [blogCategory, setBlogCategory] = React.useState<string>("All Posts");

  // filters posts based on category
  const filteredBlogs = blogCategory === "All Posts"
    ? blogs 
    : blogs.filter((blog) => blog.category === blogCategory);

  return (
    <div className="mt-5 mb-5 px-3 sm:px-10">
      {/* Heading + FilterBar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        {/* Post Category */}
        <h1 className="font-clashDisplay text-[#000000] font-medium text-sm sm:text-base text-center sm:text-left">
          "{blogCategory}"
        </h1>

        {/* FilterBar */}
        <div className="w-full sm:w-auto">
          <FilterBar setBlogCategory={setBlogCategory} />
        </div>
      </div>
      
      {/* Show Posts */}
      <div>
        {
          filteredBlogs.length === 0 ? (
            <p className="text-center text-gray-500 mt-10 font-inter font-light">Sorry no blogs found, try searching another category.</p>
          ) : <PostsCard blog={filteredBlogs}/>
        }        
      </div>
    </div>
  );
};

export default PostsPage;
