import { lazy } from 'react';
import { RoutesConfig } from 'react-baklava-router';

import queryClient from './queryClient';
import { ErrorResponse } from './api';
import { getPost, getPosts } from './api/post';
import { getUser } from './api/user';
import Index from './pages/index';
import NotFound from './pages/404';

const routes = [
  route({
    name: 'home',
    path: '/',
    component: Index,
  }),
  route({
    name: 'about',
    path: '/about',
    component: lazy(() => import('./pages/about')),
  }),
  route({
    name: 'me',
    path: '/me',
    loader: () => {
      return Promise.allSettled([queryClient.prefetchQuery(getUser(1))]);
    },
    children: [
      route({
        name: 'index',
        path: '/',
        component: lazy(() => import('./pages/profile')),
      }),
      route({
        name: 'posts',
        path: '/posts',
        component: lazy(() => import('./pages/posts')),
        loader: () => {
          return Promise.allSettled([queryClient.prefetchQuery(getPosts())]);
        },
      }),
      route({
        name: 'post',
        path: '/posts/:id',
        component: lazy(() => import('./pages/post/layout')),
        loader: ({ params }) => {
          return Promise.allSettled([queryClient.prefetchQuery(getPost(Number(params.id)))]);
        },
        children: [
          route({
            name: 'index',
            path: '/',
            component: lazy(() => import('./pages/post')),
          }),
          route({
            name: 'comments',
            path: '/comments',
            component: lazy(() => import('./pages/post-comments')),
          }),
          route({
            name: 'other',
            path: '/*',
            component: lazy(() => import('./pages/other')),
          }),
        ],
      }),
    ],
  }),
  route({
    name: '404',
    path: '/*',
    component: NotFound,
  }),
] satisfies RoutesConfig;

function route(params: RoutesConfig[number]) {
  return {
    loading: () => 'Loading...',
    error: ({ error }: { error: ErrorResponse }) => error.message,
    ...params,
  };
}

export default routes;
