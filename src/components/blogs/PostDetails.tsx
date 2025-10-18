import React from 'react'
import { useParams } from 'react-router-dom'
import { blogs } from '../../data/blogs'
import { DetailsHeroSection } from './DetailsHeroSection';
import { Comments } from './Comments';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();

  // find blog with matching id
  const blogId = Number(id);
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) {
    return <div className="min-h-screen text-3xl font-bold text-center mt-10 text-gray-500 font-clashDisplay">Blog not found. Check other blogs...</div>;
  }

  return (
    <div>
      <DetailsHeroSection blog={blog} />
      <Comments blog={blog} />
    </div>
  )
}

export default PostDetails