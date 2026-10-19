import React from 'react';
import { useParams } from 'react-router';
import ProductDetailsHero from './ProductDetailsHero';
import SimilarProducts from './SimilarProducts';
import { NotFound } from '../../pages/NotFound';
import { useContent } from '../../content/useContent';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content, loading } = useContent();
  const product = content.shop.products.find((p) => String(p.id) === id);

  if (!product) {
    if (loading) return <div className="min-h-screen bg-white" />;
    return <NotFound />;
  }

  return (
    <>
      <ProductDetailsHero product={product} />
      <SimilarProducts product={product} />
    </>
  );
};

export default ProductDetails;
