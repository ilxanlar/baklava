import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-baklava-router';

import { getPosts } from '../../api/post';

export default function Posts() {
  const qr = useSuspenseQuery(getPosts());

  return (
    <>
      <h1>Posts List</h1>
      <ul>
        {qr.data.map((post) => (
          <li key={post.id}>
            <Link to={`/me/posts/${String(post.id)}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
