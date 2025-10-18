import React from "react";
import { FiMessageSquare, FiUser } from "react-icons/fi";

interface DetailsHeroSectionProps {
  blog: {
    id: number;
    category: string;
    title: string;
    image: string;
    author: string;
    subtitle: string;
    description: string;
    date: {
      day: string;
      month: string;
      year: string;
    };
    comments: {
      id: number;
      name: string;
      text: string;
    }[];
  };
}

export const DetailsHeroSection: React.FC<DetailsHeroSectionProps> = ({ blog }) => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Blog Image */}
      <div className="overflow-hidden rounded-2xl shadow-sm">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-56 sm:h-72 md:h-[420px] object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Author & Comments */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 items-center mt-4 text-[#5B5B5B] font-poppins">
        <div className="flex items-center gap-2">
          <FiUser className="text-[20px]" />
          <span className="text-sm sm:text-base">{blog.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiMessageSquare className="text-[20px]" />
          <span className="text-sm sm:text-base">
            {blog.comments.length}{" "}
            {blog.comments.length === 1 ? "Comment" : "Comments"}
          </span>
        </div>
        <div className="ml-auto text-sm text-gray-500 hidden sm:block">
          {blog.date.day} {blog.date.month}, {blog.date.year}
        </div>
      </div>

      {/* Blog Headings & Text */}
      <div className="mt-6 space-y-4">
        <h1 className="font-clashDisplay text-2xl sm:text-3xl md:text-4xl font-semibold text-[#191919] leading-tight">
          {blog.title}
        </h1>
        <h2 className="font-clashDisplay text-lg sm:text-xl text-[#2e2e2e] font-medium">
          {blog.subtitle}
        </h2>
        <p className="font-poppins text-[#5B5B5B] text-sm sm:text-base leading-7">
          {blog.description}
        </p>
      </div>
    </section>
  );
};
