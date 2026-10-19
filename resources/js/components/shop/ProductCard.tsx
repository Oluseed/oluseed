import React from 'react';
import { Link } from 'react-router';
import { FiArrowUpRight } from 'react-icons/fi';
import { TiltCard } from '../motion';
import type { ProductItem } from '../../content/types';
import { naira } from '../../content/format';
import { useT } from '../../i18n/useLocale';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const t = useT();
  return (
    <Link to={`/shop/${product.id}`} className="block h-full">
      <TiltCard
        max={6}
        className="group card-border-glow flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
      >
        <div className="relative aspect-square overflow-hidden bg-mist">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70 backdrop-blur">
            {product.category}
          </span>
          {!product.inStock && (
            <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              {t.shop.soldOut}
            </span>
          )}
          <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-brand text-white opacity-0 shadow-glow transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <FiArrowUpRight className="h-5 w-5" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-[1.15rem] font-semibold leading-tight text-ink transition-colors group-hover:text-brand">{product.name}</h3>
            <p className="shrink-0 font-display text-[1.05rem] font-semibold text-ink">{naira(product.price)}</p>
          </div>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">{product.spec}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-ink/70">
            {t.shop.viewDetails}
            <span className="h-px w-6 bg-ink/30 transition-all duration-500 group-hover:w-10 group-hover:bg-brand" />
          </span>
        </div>
      </TiltCard>
    </Link>
  );
};
