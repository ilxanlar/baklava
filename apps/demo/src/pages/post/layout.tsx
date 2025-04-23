import { useSuspenseQuery } from '@tanstack/react-query';

import { ChildRoutes, Link, useParams } from '../../lib';
import { getPost } from '../../api/post';

export default function Post() {
  const { id } = useParams();

  const qr = useSuspenseQuery(getPost(Number(id)));

  return (
    <>
      <header>
        <h1>{qr.data.title}</h1>
        <Link to={'/me/posts'}>{'< Go Back'}</Link>
      </header>
      <ChildRoutes />
    </>
  );
}
