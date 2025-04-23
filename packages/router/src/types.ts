import { FC, LazyExoticComponent } from 'react';

export type RouteParams = Record<string, string>;

export type RouteArrayItem = {
  name?: string;
  path: string;
  component?: FC | LazyExoticComponent<FC>;
  children?: RouteArrayItem[];
  loader?: (payload: { params: RouteParams }) => any | Promise<any>;
  loading?: FC;
  error?: FC<{ error: any }>;
};

export type RoutesConfig = RouteArrayItem[];
