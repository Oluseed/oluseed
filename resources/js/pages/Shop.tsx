import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FilterBar } from '../components/shop/FilterBar';
import { HeroSection } from '../components/shop/HeroSection';
import { ProductCard } from '../components/shop/ProductCard';
import { Reveal } from '../components/motion';
import { EASE } from '../components/motion/variants';
import { useContent } from '../content/useContent';
import { useT } from '../i18n/useLocale';

export const Shop: React.FC = () => {
  const { content, locale } = useContent();
  const t = useT();
  const products = content.shop.products;
  const ALL = '__all__';
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const categories = [ALL, ...new Set(products.map((p) => p.category).filter(Boolean))];
  React.useEffect(() => setSelectedCategory(ALL), [locale]);
  const filtered = selectedCategory === ALL || !categories.includes(selectedCategory) ? products : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <HeroSection />
      <section className="section-y bg-white">
        <div className="container-x">
          <Reveal>
            <FilterBar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} labelFor={(c) => (c === ALL ? t.shop.allProducts : c)} />
          </Reveal>

          {filtered.length === 0 ? (
            <div className="mt-16 rounded-[2rem] border border-dashed border-line bg-mist/60 p-10 text-center sm:p-14">
              <p className="font-display text-2xl font-semibold text-ink">{t.shop.none}</p>
            </div>
          ) : (
            <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};
