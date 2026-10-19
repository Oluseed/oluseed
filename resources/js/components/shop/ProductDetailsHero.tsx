import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowLeft, FiCheck, FiShield, FiTruck, FiX } from 'react-icons/fi';
import { EASE } from '../motion/variants';
import { Magnetic } from '../motion';
import { naira } from '../../content/format';
import { useContent } from '../../content/useContent';
import type { ProductItem } from '../../content/types';
import { useT } from '../../i18n/useLocale';

interface ProductDetailsHeroProps {
  product: ProductItem;
}

const ProductDetailsHero: React.FC<ProductDetailsHeroProps> = ({ product }) => {
  const { content } = useContent();
  const t = useT();
  const whatsappNumber = content.brand.whatsapp.replace(/\D/g, '');
  const message = t.shop.waMessage(product.name, naira(product.price));
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section className="relative overflow-hidden bg-white pb-10 pt-28 md:pt-40">
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-brand-100/60 blur-[150px]" />

      <div className="container-x">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <Link to="/shop" className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-ink">
            <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" /> {t.shop.back}
          </Link>
        </motion.div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="group relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-mist shadow-lift"
          >
            <motion.img
              src={product.image}
              alt={product.name}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
              className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70 backdrop-blur">
              {product.category}
            </span>
          </motion.div>

          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }} className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {product.category}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }} className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
              {product.name}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: EASE }} className="mt-3 text-[15px] font-medium text-ink/70">
              {product.spec}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: EASE }} className="mt-6 font-display text-4xl font-semibold text-brand">
              {naira(product.price)}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: EASE }} className="mt-6 whitespace-pre-line text-[15px] leading-[1.8] text-muted">
              {product.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: EASE }} className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.25}>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_14px_34px_-12px_rgba(37,211,102,0.7)] transition-all duration-500 hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="h-5 w-5" /> {t.shop.order}
                </a>
              </Magnetic>
              <span className="inline-flex items-center gap-2 text-[13px] text-muted">
                {product.inStock ? (
                  <>
                    <FiCheck className="text-emerald-500" /> {t.shop.inStock}
                  </>
                ) : (
                  <>
                    <FiX className="text-red-500" /> {t.shop.outOfStock}
                  </>
                )}
              </span>
            </motion.div>

            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="mt-10 grid gap-3 border-t border-line pt-6 text-[13.5px] text-muted sm:grid-cols-2">
              <li className="inline-flex items-center gap-2">
                <FiTruck className="text-brand" /> {t.shop.delivery}
              </li>
              <li className="inline-flex items-center gap-2">
                <FiShield className="text-brand" /> {t.shop.inspected}
              </li>
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsHero;
