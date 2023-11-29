import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getPosts from '@wasp/queries/getPosts';
import './Home.css';

export function Home() {
  const { data: posts, isLoading, error } = useQuery(getPosts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
    <div className='home-container'>
      <h1 className='title'>Posts</h1>



      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <Link to={`/post/${post.id}`} className='post-link'>
                  {post.title}
                </Link>
              </td>
              <td>{post.author}</td>
              {/* <Link to={`/edit-post/${post.id}`}>Edit</Link> */}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className='home-container'>
      <div className='create-post-card'>
          <Link to="/new-post" className='create-post-button'>
            Create New Post
          </Link>
        </div>
      </div>
    </div>
  );
}
