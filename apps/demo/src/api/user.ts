import { queryOptions } from '@tanstack/react-query';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export function getUser(id: number) {
  return queryOptions({
    queryKey: ['id'],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => res.json() as Promise<User>),
  });
}
