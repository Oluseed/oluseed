import React from 'react';
import { motion } from 'framer-motion';
import FilterBar, { ALL_POSTS } from './FilterBar';
import { PostsCard } from './PostsCard';
import Pagination from './Pagination';
import { Reveal } from '../motion';
import { useContent } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';

const PostsPage: React.FC = () => {
  const { content, locale } = useContent();
  const t = useT();
  const blogs = content.blog.posts;
  const [blogCategory, setBlogCategory] = React.useState<string>(ALL_POSTS);
  React.useEffect(() => setBlogCategory(ALL_POSTS), [locale]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const postsPerPage = 6;

  const categories = [...new Set(blogs.map((b) => b.category.trim()).filter(Boolean))];

  const filteredBlogs =
    blogCategory === ALL_POSTS
      ? blogs
      : blogs.filter((blog) => blog.category.trim().toLowerCase() === blogCategory.trim().toLowerCase());

  const indexOfLastPost = currentPage * postsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfLastPost - postsPerPage, indexOfLastPost);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [blogCategory]);

  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <Reveal>
          <FilterBar setBlogCategory={setBlogCategory} categories={categories} active={blogCategory} />
        </Reveal>

        {filteredBlogs.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 rounded-[2rem] border border-dashed border-line bg-mist/60 p-10 text-center sm:p-14">
            <p className="font-display text-2xl font-semibold text-ink">
              {blogs.length === 0 ? t.blog.noPosts : `${t.blog.noPostsIn} "${blogCategory}"`}
            </p>
            <p className="mt-2 text-[14px] text-muted">{blogs.length === 0 ? t.blog.checkBack : t.blog.tryAnother}</p>
          </motion.div>
        ) : (
          <>
            <PostsCard blog={currentBlogs} />
            <Pagination totalPosts={filteredBlogs.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </>
        )}
      </div>
    </section>
  );
};

export default PostsPage;
