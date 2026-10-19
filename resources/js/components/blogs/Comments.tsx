import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { Reveal } from '../motion';
import { EASE } from '../motion/variants';
import type { BlogPost } from '../../content/types';
import { useT } from '../../i18n/useLocale';

interface CommentsProps {
  blog: BlogPost;
}

const avatarFor = (name: string) => `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0f04ff`;

export const Comments: React.FC<CommentsProps> = ({ blog }) => {
  const t = useT();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(blog.comments);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !comment.trim()) {
      setError(t.blog.fillAll);
      return;
    }
    setError('');
    setComments([...comments, { id: Date.now(), name, text: comment }]);
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <section className="bg-mist">
      <div className="container-x py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                {comments.length} {comments.length === 1 ? t.blog.commentTitle : t.blog.commentsTitle}
              </h2>
            </Reveal>

            <ul className="mt-8 space-y-4">
              <AnimatePresence initial={false}>
                {comments.length > 0 ? (
                  comments.map((c) => (
                    <motion.li
                      layout
                      key={c.id}
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="flex gap-4 rounded-3xl border border-line bg-white p-5 shadow-soft"
                    >
                      <img src={c.image || avatarFor(c.name)} alt={c.name} className="h-11 w-11 shrink-0 rounded-full object-cover" />
                      <div>
                        <p className="font-display text-[15px] font-semibold text-ink">{c.name}</p>
                        <p className="mt-1 text-[14px] leading-relaxed text-muted">{c.text}</p>
                      </div>
                    </motion.li>
                  ))
                ) : (
                  <li className="rounded-3xl border border-dashed border-line p-8 text-center text-[14px] text-muted">{t.blog.noComments}</li>
                )}
              </AnimatePresence>
            </ul>
          </div>

          <Reveal direction="right" distance={40} delay={0.1} className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-line bg-white p-6 shadow-lift sm:p-7">
              <h3 className="font-display text-2xl font-semibold text-ink">{t.blog.leaveComment}</h3>
              <p className="mt-1 text-[13px] text-muted">{t.blog.notPublished}</p>

              <div className="mt-6 space-y-4">
                <input type="text" placeholder={t.blog.name} value={name} onChange={(e) => setName(e.target.value)} className="input-premium" />
                <input type="email" placeholder={t.blog.email} value={email} onChange={(e) => setEmail(e.target.value)} className="input-premium" />
                <textarea placeholder={t.blog.write} value={comment} onChange={(e) => setComment(e.target.value)} className="input-premium h-32 resize-none" />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 text-[13px] text-red-500">
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="shine mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[14px] font-semibold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand"
              >
                {t.blog.post} <FiSend />
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
