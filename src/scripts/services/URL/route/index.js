/**
 * Based on the route relative to the application root generates full route.
 *
 * @param {string} path - Route relative to application root.
 * @returns {string} - Full route.
 */
export default function (path) {
  if (!path || typeof path !== 'string') {
    return '/';
  }

  const routeBase = (path[0] === '/') ? '' : '/';
  return `${routeBase}${path}`;
}
