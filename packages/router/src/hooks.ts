import { useCallback, useContext } from 'react';
import { RouterContext } from './context';

function useRouteContext() {
  return useContext(RouterContext);
}

export function useUrl() {
  const { url } = useRouteContext();
  return url;
}

export function useParams() {
  const { params } = useRouteContext();
  return params;
}

export function useNavigate() {
  const { navigate } = useRouteContext();
  return useCallback((to: string) => navigate(to), [navigate]);
}

export function useChildRoutes() {
  const { childRoutes } = useRouteContext();
  return childRoutes || null;
}
