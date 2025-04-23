export function matchPath0(routePath: string, currentPath: string) {
  const routeSegments = routePath.split('/').filter(Boolean);
  const currentSegments = currentPath.split('/').filter(Boolean);

  const params: Record<string, string> = {};
  let exact = true;

  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i];
    const currentSegment = currentSegments[i];

    // If wildcard "*" is found, match everything after it
    if (routeSegment === '*') {
      exact = false; // Wildcard means it's not an exact match
      break;
    }

    // If there's no corresponding segment in the URL, it's not a match
    if (!currentSegment) return null;

    // Handle dynamic parameters (e.g., ":id")
    if (routeSegment.startsWith(':')) {
      params[routeSegment.slice(1)] = currentSegment;
    } else if (routeSegment !== currentSegment) {
      return null; // Mismatch
    }
  }

  // If the currentPath has extra segments but there's no "*", it's not an exact match
  if (currentSegments.length > routeSegments.length && routeSegments[routeSegments.length - 1] !== '*') {
    return null;
  }

  return { params, exact };
}

export function matchPath(routePath: string, currentPath: string) {
  const routeSegments = routePath.split('/').filter(Boolean);
  const currentSegments = currentPath.split('/').filter(Boolean);

  if (routeSegments.length > currentSegments.length) {
    return null;
  }

  const params: Record<string, string> = {};
  const exact = routeSegments.length === currentSegments.length;

  for (let i = 0; i < routeSegments.length; i++) {
    if (routeSegments[i] === '*') {
      return { params: {}, exact: false, wildcard: true };
    }

    if (!currentSegments[i]) {
      break;
    }

    if (routeSegments[i].startsWith(':')) {
      params[routeSegments[i].slice(1)] = currentSegments[i];
    } else if (routeSegments[i] !== currentSegments[i]) {
      return null;
    }
  }

  return { params, exact };
}

export function getPathParams(path: string) {
  return path
    .split('/')
    .filter((segment) => segment && segment.startsWith(':'))
    .map((segment) => segment.replace(':', ''));
}

export function getCurrentUrl() {
  return new URL(window.location.href);
}

export function getUrlFor(to: string) {
  return new URL(to, window.location.origin);
}
