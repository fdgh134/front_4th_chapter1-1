import { getCurrentPath } from './getCurrentPath';

export const renderNav = () => {
  const currentPath = getCurrentPath();
  const nav = document.querySelector('nav ul');
  if (!nav) return;

  const login = localStorage.getItem('user');
  nav.innerHTML = `
    <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
    ${
      login
        ? `<li><a href="/profile" class="text-gray-600">프로필</a></li>
    <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>`
        : `<li><a href="/login" class="text-gray-600">로그인</a></li>`
    }
  `;

  const navLinks = nav.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.remove('text-gray-600');
      link.classList.add('text-blue-600', 'font-bold');
    } else {
      link.classList.remove('text-blue-600', 'font-bold');
      link.classList.add('text-gray-600');
    }
  });
};
