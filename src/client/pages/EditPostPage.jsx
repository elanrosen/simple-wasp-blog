import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import updatePost from '@wasp/actions/updatePost';

export function EditPostPage() {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { postId });
  const updatePostFn = useAction(updatePost);

  // New state for title and content
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Populate the state when the post is fetched
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdatePost = () => {
    updatePostFn({ id: postId, title, content });
  };


  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Edit Post</h1>
      <form className='mb-4'>
        <label className='block mb-2'>Title</label>
        <input
          type='text'
          className='border rounded px-2 py-1 mb-2 w-full'
          defaultValue={post.title}
          onChange={(e) => handleUpdatePost(e.target.value, post.content)}
        />

        <label className='block mb-2'>Content</label>
        <textarea
          className='border rounded px-2 py-1 mb-2 w-full'
          defaultValue={post.content}
          onChange={(e) => handleUpdatePost(post.title, e.target.value)}
        ></textarea>

        <button
          type='button'
          onClick={() => handleUpdatePost(post.title, post.content)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Update
        </button>
      </form>
    </div>
  );
}