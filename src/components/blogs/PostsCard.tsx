import React from "react";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router";

interface Blog {
  id: number;
  category: string;
  title: string;
  image: string;
  author: string;
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
}

interface PostsCardProps {
  blog: Blog[];
}

export const PostsCard: React.FC<PostsCardProps> = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blog.map((item) => (
        <div
          onClick={() => navigate(`/blogs/${item.id}`)}
          key={item.id}
          className="border cursor-pointer border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-[#FFF8EF] p-3"
        >
          {/* Blog Image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded-md mb-3"
          />

          {/* Blog Details */}
          <div className="space-y-2">

            {/* Author and Comments */}
            <div className="flex gap-x-4 text-sm text-[#5B5B5B] font-poppins font-normal">
              <div className="flex items-center gap-1">
                <FiUser className="text-[14px]"/>
                <span className="text-[13px]">{item.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiMessageSquare className="text-[14px]" />
                <span className="text-[13px]">
                  {
                    item.comments.length > 1 ? item.comments.length + " Comments" : item.comments.length + " Comment"
                  }
                </span>
              </div>
            </div>
            
            {/* Title */}
            <div>
              <p className="text-[12px] text-[#0071E3] font-medium font-clashDisplay">
                {item.category}
              </p>
              <h2 className="font-medium text-2xl text-[#191919] font-clashDisplay">
                {item.title}
              </h2>
            </div>
            
            {/* Date */}
            <div className="grid w-13 h-13 place-content-center bg-[#0071E3] text-[14px] text-[#FFFFFF] font-clashDisplay rounded-full font-medium">
              <p>{item.date.day} / <br /> {item.date.month}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
