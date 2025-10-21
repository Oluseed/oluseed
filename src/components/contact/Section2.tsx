import React, { useState } from "react";
import image from "../../assets/images/contact-img.png";

const Section2: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, comment });
  };

  return (
    <div className="bg-[#fafafa] py-12 px-5 sm:px-10 lg:px-20">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        
        {/* IMAGE SECTION */}
        <div className="w-full lg:w-1/2">
          <img
            src={image}
            alt="Contact Illustration"
            className="w-full h-auto rounded-2xl object-cover shadow-md"
          />
        </div>

        {/* FORM SECTION */}
        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-clashDisplay font-semibold text-[#0071E3] mb-6">
            Leave a Comment
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-poppins text-[#0071E3] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                />
              </div>

              <div>
                <label className="block text-sm font-poppins text-[#0071E3] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                />
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-poppins text-[#0071E3] mb-1">
                Comment
              </label>
              <textarea
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0071E3] h-28 resize-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#0071E3] text-white font-poppins font-medium rounded-md hover:bg-[#333] transition-colors"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Section2;
