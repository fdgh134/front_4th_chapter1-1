import { router } from '../router/router';
import { getCurrentPath } from './getCurrentPath';

export const navigation = path => {
  const validPaths = ['/', '/profile', '/login', '/404'];
  if (!validPaths.includes(path)) {
    path = '/404';
  }

  const currentPath = getCurrentPath();

  if (currentPath === path) {
    return;
  }

  if (window.history.pushState) {
    window.history.pushState({}, '', path);
  } else {
    window.location.hash = `#${path}`;
  }
  // 경로 변경 후 렌더링
  router();
};
