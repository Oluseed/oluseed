import React, { useState } from "react";

interface BlogProps {
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
    image?: string;
  }[];
}

interface CommentsProps {
  blog: BlogProps;
}

export const Comments: React.FC<CommentsProps> = ({ blog }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog.comments);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !comment.trim()) {
      alert("Please fill in all fields before posting your comment.");
      return;
    }

    const newComment = {
      id: comments.length + 1,
      name,
      text: comment,
      image: "https://via.placeholder.com/50", // placeholder avatar
    };

    setComments([...comments, newComment]);
    setName("");
    setEmail("");
    setComment("");
  };

  return (
    <section className="mt-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Comments Heading */}
      <h2 className="text-2xl font-clashDisplay font-semibold text-[#191919] mb-6">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h2>

      {/* Existing Comments */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b pb-4 flex gap-4 items-start"
            >
              <img
                src={comment.image || "https://via.placeholder.com/60"}
                alt={comment.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-clashDisplay text-[#191919] font-semibold text-base sm:text-lg">
                  {comment.name}
                </div>
                <p className="text-[#5B5B5B] font-poppins text-sm sm:text-base mt-1">
                  {comment.text}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#5B5B5B] font-poppins text-sm">
            No comments yet.
          </p>
        )}
      </div>

      {/* Leave a Comment Section */}
      <div className="mt-10">
        <h3 className="text-xl sm:text-2xl font-clashDisplay font-semibold text-[#191919] mb-4">
          Leave a Comment
        </h3>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-50 p-5 sm:p-8 rounded-xl shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-poppins text-[#191919] mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#191919]"
              />
            </div>

            <div>
              <label className="block text-sm font-poppins text-[#191919] mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#191919]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-poppins text-[#191919] mb-1">
              Comment
            </label>
            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#191919] h-28 resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-[#0f04ff] text-white font-medium rounded-md hover:bg-[#333] transition-colors w-full font-poppins sm:w-auto"
          >
            Post Comment
          </button>
        </form>
      </div>
    </section>
  );
};
