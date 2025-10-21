import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface ProductDetailsHeroProps {
  product: {
    id: number;
    name: string;
    price: number;
    spec: string;
    image: string;
    category: string;
    description: string;
  };
}

const ProductDetailsHero: React.FC<ProductDetailsHeroProps> = ({ product }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-10 px-4 sm:px-8 lg:px-20">
      {/* Image Section */}
      <div className="flex-1 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl object-cover shadow-md"
        />
      </div>

      {/* Details Section */}
      <div className="flex-1 grid gap-4 max-w-xl text-center lg:text-left">
        <h1 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#121212]">
          {product.name}
        </h1>

        <p className="font-poppins text-[#656565] text-sm sm:text-base leading-6">
          {product.description}
        </p>

        <p className="font-inter font-bold text-lg sm:text-xl text-[#121212]">
          #{product.price}.00
        </p>

        <button
          aria-label="Chat on WhatsApp"
          className="border p-3 sm:p-4 rounded-xl flex justify-center lg:justify-start 
                     hover:bg-green-600/10 bg-[#FFA15C14] gap-2 items-center 
                     font-medium text-base sm:text-lg cursor-pointer transition"
        >
          <FaWhatsapp className="text-2xl sm:text-3xl text-green-600" />
          <span className="text-[#434343] font-poppins">Message us</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsHero;
