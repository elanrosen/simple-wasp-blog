import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import getComments from '@wasp/queries/getComments';
import createComment from '@wasp/actions/createComment';
import './ViewPost.css';

export function ViewPost() {
  const { postId } = useParams();
  const { data: post, isLoading: postLoading, error: postError } = useQuery(getPost, { postId });
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useQuery(getComments, { postId });
  const createCommentFn = useAction(createComment);
  const [newComment, setNewComment] = useState('');

  if (postLoading || commentsLoading) return 'Loading...';
  if (postError) return 'Error: ' + postError;
  if (commentsError) return 'Error: ' + commentsError;

  const handleCreateComment = () => {
    createCommentFn({ content: newComment, postId });
    setNewComment('');
  };

  return (
    <div className='view-post-container'>
      <h1 className='post-title'>{post.title}</h1>
      <p className='post-content'>{post.content}</p>

      <div className='divider-container'>
        <hr className='divider' />
        <span className='divider-label'>Comments</span>
      </div>

      <div className='comments-container'>
        {comments.map((comment) => (
          <div key={comment.id} className='comment-box'>
            <p className='comment-text'>{comment.content}</p>
          </div>
        ))}
      </div>

      <div className='comment-input'>
        <label htmlFor='commentText' className='block text-gray-700 font-bold text-sm mb-2'>
          Add a Comment
        </label>
        <textarea
          id='commentText'
          className='comment-textarea'
          placeholder='Write your comment here...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          onClick={handleCreateComment}
          className='add-comment-button'
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
