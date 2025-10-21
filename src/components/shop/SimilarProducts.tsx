import React from "react";
import { products } from "../../data/products";
import { ProductCard } from "./ProductCard";

interface Props {
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

const SimilarProducts: React.FC<Props> = ({ product }) => {
  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  if (similarProducts.length === 0) {
    return (
      <div className="min-h-[40vh] flex flex-col justify-center items-center text-gray-500 font-clashDisplay">
        <h2 className="text-2xl font-semibold mb-2">No similar products found.</h2>
        <p className="text-sm text-gray-400">
          Check back later for more items in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 mb-20 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-gray-800 font-clashDisplay mb-8 border-b border-gray-200 pb-3">
        Similar Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {similarProducts.map((item) => (
          <div
            key={item.id}
            className="transition-transform transform  bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200"
          >
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
