import { Link, useParams } from '../../lib';

export default function PostComments() {
  const { id } = useParams();
  return (
    <>
      <h1>Post Comments</h1>
      <Link to={`/me/posts/${id}`}>{'< Go Back'}</Link>
    </>
  );
}
