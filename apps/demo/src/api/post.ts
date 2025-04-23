import { queryOptions } from '@tanstack/react-query';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export function getPosts() {
  return queryOptions({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await res.json();
      if (res.status === 200) {
        return json as Promise<Post[]>;
      } else {
        throw {
          message: 'GENERIC ERROR MESSAGE',
        };
      }
    },
  });
}

export function getPost(id: number) {
  return queryOptions({
    queryKey: ['post', id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.json() as Promise<Post>),
  });
}
