import React from 'react'
import { useParams } from 'react-router'
import { products } from '../../data/products'
import ProductDetailsHero from './ProductDetailsHero';
import SimilarProducts from './SimilarProducts';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Logic to fetch and display product details will go here
  const productId = Number(id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return <div className="min-h-screen text-3xl font-bold text-center mt-10 text-gray-500 font-clashDisplay">Product not found, Check others..</div>;
  }

  return (
    <div>
      <ProductDetailsHero product={product}/>
      <SimilarProducts product={product}/>
    </div>
  )
}

export default ProductDetails