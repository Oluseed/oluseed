import React from "react";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  if (totalPages <= 1) return null; // no need to show pagination if only one page

  return (
    <div className="flex justify-center items-center mt-6 space-x-2 font-poppins">
      {/* Prev Button */}
      {/* <button
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-300"
        }`}
      >
        Prev
      </button> */}

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-4 py-2 rounded-full ${
            currentPage === index + 1
              ? "bg-[#0f04ff] text-white font-semibold"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      {/* <button
        onClick={() =>
          currentPage < totalPages && setCurrentPage(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-full ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-300"
        }`}
      >
        Next
      </button> */}
    </div>
  );
};

export default Pagination;
