import { getCurrentPath } from '../utils/getCurrentPath';
import { navigation } from '../utils/navigation';
import { renderNav } from '../utils/render';
import { pageEventListeners } from '../utils/handleEvent';
import MainPage from '../pages/MainPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';

export const router = () => {
  let path = getCurrentPath();
  const validPaths = ['/', '/profile', '/login', '/404'];

  if (!validPaths.includes(path)) {
    path = '/404';
  }

  // 경로별 페이지 렌더링
  let page;
  if (path === '/profile') {
    page = ProfilePage();
  } else if (path === '/login') {
    page = LoginPage();
  } else if (path === '/') {
    page = MainPage();
  } else if (path === '/404') {
    page = ErrorPage();
  }

  // login -> /login = / , !login -> /profile = /login
  if (
    (path === '/login' && localStorage.getItem('user')) ||
    (path === '/profile' && !localStorage.getItem('user'))
  ) {
    const redirectPath = path === '/login' ? '/' : '/login';
    navigation(redirectPath); // 중복 경로 변경 X
    return;
  }

  const root = document.getElementById('root');
  root.innerHTML = page;

  renderNav();
  pageEventListeners();
};
