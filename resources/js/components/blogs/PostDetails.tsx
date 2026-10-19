import React from 'react';
import { useParams } from 'react-router';
import { DetailsHeroSection } from './DetailsHeroSection';
import { Comments } from './Comments';
import { NotFound } from '../../pages/NotFound';
import { useContent } from '../../content/useContent';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content, loading } = useContent();
  const blog = content.blog.posts.find((b) => String(b.id) === id);

  if (!blog) {
    if (loading) return <div className="min-h-screen bg-white" />;
    return <NotFound />;
  }

  return (
    <>
      <DetailsHeroSection blog={blog} />
      <Comments key={blog.id} blog={blog} />
    </>
  );
};

export default PostDetails;
