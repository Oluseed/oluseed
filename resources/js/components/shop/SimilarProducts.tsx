import React from 'react';
import { ProductCard } from './ProductCard';
import { SectionHeading } from '../ui/SectionHeading';
import { Stagger, StaggerItem, Reveal } from '../motion';
import { Button } from '../Button';
import { useContent } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';

interface Props {
  product: { id: string; category: string };
}

const SimilarProducts: React.FC<Props> = ({ product }) => {
  const { content } = useContent();
  const t = useT();
  const products = content.shop.products;
  const similar = products.filter((p) => p.category === product.category && p.id !== product.id);
  const list = similar.length > 0 ? similar : products.filter((p) => p.id !== product.id).slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section className="section-y bg-mist">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            key={`${t.meta.code}-${similar.length > 0}`}
            eyebrow={similar.length > 0 ? t.shop.similar : t.shop.alsoLike}
            title={similar.length > 0 ? t.shop.similarTitle : t.shop.alsoLikeTitle}
            highlight={[t.shop.similarHighlight, t.shop.alsoLikeHighlight]}
          />
          <Reveal delay={0.3}>
            <Button to="/shop" variant="secondary">
              {t.shop.browseAll}
            </Button>
          </Reveal>
        </div>

        <Stagger stagger={0.1} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.slice(0, 4).map((item) => (
            <StaggerItem key={item.id} y={30}>
              <ProductCard product={item} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default SimilarProducts;
