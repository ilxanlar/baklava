import React, { memo, Suspense, useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { RouterContext, RouterContextValue } from './context';
import { matchPath } from './helpers';
import { RouteArrayItem } from './types';
import { ChildRoutes } from './components';
import RouteErrorBoundary from './RouteErrorBoundary';

type RenderData = RouterContextValue & {
  route: RouteArrayItem;
};

type Props = {
  routes: RouteArrayItem[];
};

function Routes(props: Props) {
  const { routes } = props;

  const context = useContext(RouterContext);

  const data = useMemo(() => matchRoutes(routes, context), [routes, context]);

  useLayoutEffect(() => {
    data.forEach(item => {
      if (item.route.loader) {
        item.route.loader({
          params: item.params,
        });
      }
    });
  }, [data]);

  const tree = [...data];

  let childRoutes = null;

  while (tree.length) {
    const item = tree.pop();
    if (item) {
      childRoutes = <RouteRender {...item} childRoutes={childRoutes} />;
    }
  }

  return childRoutes;
}

export default memo<Props>(Routes);

function matchRoutes(allRoutes: RouteArrayItem[], context: RouterContextValue) {
  function findTree(routes: RouteArrayItem[], initialTree: RenderData[] = []): RenderData[] {
    const tree: RenderData[] = [...initialTree];

    const getTreeLastItem = () => (tree.length > 0 ? tree[tree.length - 1] : context);

    for (const route of routes) {
      const match = matchPath(route.path, context.url.pathname);

      if (match && (match.exact || route.children || match.wildcard)) {
        tree.push({
          ...getTreeLastItem(),
          route,
          params: match.params,
        });

        if (match.exact) {
          if (route.children) {
            const indexRoute = route.children?.find((ch) => ch.name === 'index');
            if (indexRoute) {
              tree.push({
                ...getTreeLastItem(),
                route: indexRoute,
                params: match.params,
              });
              return tree;
            }
          } else {
            return tree;
          }
        }

        if (route.children) {
          const finalTree = findTree(route.children, tree);
          if (finalTree.length > 0) {
            return finalTree;
          }
        }

        if (match.wildcard) {
          return tree;
        }
      }
    }

    return [];
  }

  return findTree(allRoutes);
}

function RouteRender(props: RenderData) {
  const { route, ...context } = props;

  const Component = useCallback(() => {
    return route.component ? <route.component /> : <ChildRoutes />;
  }, [route]);

  const Loading = useCallback(({ children }: { children: React.ReactNode }) => {
    if (route.loading) {
      return (
        <Suspense fallback={route.loading ? <route.loading /> : null}>
          {children}
        </Suspense>
      );
    }
    return children;
  }, [route]);

  const Error = useCallback(({ children }: { children: React.ReactNode }) => {
    if (route.error) {
      return (
        <RouteErrorBoundary renderError={(err) => route.error ? <route.error error={err} /> : null}>
          {children}
        </RouteErrorBoundary>
      );
    }
    return children;
  }, [route]);

  return (
    <RouterContext.Provider value={context}>
      <Error>
        <Loading>
          <Component />
        </Loading>
      </Error>
    </RouterContext.Provider>
  );
}
