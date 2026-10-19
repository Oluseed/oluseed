import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router';
import { FiArrowLeft, FiClock, FiMessageSquare, FiUser } from 'react-icons/fi';
import { Reveal, SplitText } from '../motion';
import { EASE } from '../motion/variants';
import type { BlogPost } from '../../content/types';
import { useT } from '../../i18n/useLocale';

interface DetailsHeroSectionProps {
  blog: BlogPost;
}

export const DetailsHeroSection: React.FC<DetailsHeroSectionProps> = ({ blog }) => {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const readMinutes = Math.max(2, Math.round(blog.description.split(/\s+/).length / 180));

  return (
    <article className="bg-white">
      <div ref={ref} className="relative isolate h-[70vh] min-h-[480px] overflow-hidden bg-ink text-white">
        <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
          <motion.img
            src={blog.image}
            alt={blog.title}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />

        <div className="container-x flex h-full flex-col justify-end pb-14 pt-32">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
            <Link to="/blogs" className="group inline-flex items-center gap-2 text-[13px] font-medium text-white/70 transition-colors hover:text-white">
              <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" /> {t.blog.back}
            </Link>
          </motion.div>

          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }} className="eyebrow mt-8 text-brand-200">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-200" /> {blog.category}
          </motion.span>

          <SplitText
            key={blog.title}
            as="h1"
            immediate
            text={blog.title}
            delay={0.3}
            className="mt-4 max-w-4xl font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-white/65"
          >
            <span className="inline-flex items-center gap-2">
              <FiUser /> {blog.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <FiClock /> {readMinutes} {t.blog.minRead}
            </span>
            <span className="inline-flex items-center gap-2">
              <FiMessageSquare /> {blog.comments.length} {blog.comments.length === 1 ? t.blog.comment : t.blog.comments}
            </span>
            <span className="text-white/45">
              {blog.day} {blog.month}, {blog.year}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">{blog.subtitle}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 border-l-2 border-brand pl-6">
              <p className="whitespace-pre-line text-[16px] leading-[1.9] text-muted sm:text-[17px]">{blog.description}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
};
