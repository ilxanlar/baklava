import { createContext, ReactNode } from 'react';
import { getCurrentUrl } from './helpers';
import { RouteArrayItem } from './types';

export type RouterContextValue = {
  childRoutes?: ReactNode | null;
  matchedRoutes?: RouteArrayItem[];
  navigate: (to: string) => void;
  params: Record<string, string>;
  url: URL;
};

export const RouterContext = createContext<RouterContextValue>({
  url: getCurrentUrl(),
  navigate: () => {
    console.warn('Router is not ready to navigate yet!');
  },
  params: {},
});
