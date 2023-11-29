import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import { useQuery } from '@wasp/queries';
import createPost from '@wasp/actions/createPost';
import getPosts from '@wasp/queries/getPosts';
import './NewPost.css';

export function NewPostPage() {
  const createPostFn = useAction(createPost);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(''); // Error state for validation
  const { data: posts, isLoading, error: queryError } = useQuery(getPosts);

  const handleSubmit = () => {
    if (!title || !content) {
      setError('Please enter both a title and content.'); // Display error message
      return;
    }

    createPostFn({ title, content });
    setTitle('');
    setContent('');
    setError('');
  };

  if (isLoading) return 'Loading...';
  if (queryError) return 'Error: ' + queryError;

  return (
    <div className='new-post-container'>
      <h1 className='new-post-title'>New Post</h1>
      {error && <p className='error-message'>{error}</p>} {/* Display error message */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Title'
          className='form-input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <textarea
          placeholder='Content'
          className='form-input'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className='submit-button'
      >
        Submit
      </button>
    </div>
  );
}
