export const getCurrentPath = () => {
  if (window.location.hash) {
    return window.location.hash.slice(1);
  }
  return window.location.pathname;
};
