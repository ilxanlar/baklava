import { useSuspenseQuery } from '@tanstack/react-query';

import { Link, useParams } from '../../lib';
import { getPost } from '../../api/post';

export default function Post() {
  const { id } = useParams();

  const qr = useSuspenseQuery(getPost(Number(id)));

  return (
    <>
      <p>
        {qr.data.body}
      </p>
      <hr />
      <Link to={`/me/posts/${id}/comments`}>Display Post Comments</Link>
    </>
  );
}
