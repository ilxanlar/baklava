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
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json() as Promise<Post[]>),
  });
}

export function getPost(id: number) {
  return queryOptions({
    queryKey: ['post', id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.json() as Promise<Post>),
  });
}
