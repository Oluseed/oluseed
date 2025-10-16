import React from "react";

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
    name: string;
    text: string;
  };
}

interface PostsCardProps {
  blog: Blog[]; // ✅ expects an array of Blog objects
}

export const PostsCard: React.FC<PostsCardProps> = ({ blog }) => {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blog.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover rounded-md mb-3"
          />

          <div className="space-y-2">
            <h2 className="font-semibold text-lg text-gray-900">
              {item.title}
            </h2>
            <p className="text-sm text-[#0071E3] font-medium">
              {item.category}
            </p>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <p>By {item.author}</p>
              <p>
                {item.date.day} {item.date.month}, {item.date.year}
              </p>
            </div>

            <div className="mt-2 text-sm text-gray-600 italic border-t pt-2">
              “{item.comments.text}” — {item.comments.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
