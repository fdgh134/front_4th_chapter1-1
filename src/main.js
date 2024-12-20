import { router } from './router/router';
import { loadProfile } from './store/storage';
import { renderNav } from './utils/render';
import { pageEventListeners } from './utils/handleEvent';
import { getCurrentPath } from './utils/getCurrentPath';

// popstate
window.addEventListener('popstate', () => {
  router();
});

// hashchange
window.addEventListener('hashchange', () => {
  router();
});

const main = () => {
  loadProfile();
  renderNav();
  pageEventListeners();

  const initialPath = getCurrentPath();
  router(initialPath);

  window.addEventListener('hashchange', router);
  window.addEventListener('popstate', router);
};

main();
