import { saveProfile } from '../store/storage';
import { navigation } from './navigation';
import { state } from '../store/storage';

export const pageEventListeners = () => {
  document.body.removeEventListener('click', handleClick);
  document.body.addEventListener('click', handleClick);

  document.body.removeEventListener('submit', handleSubmit);
  document.body.addEventListener('submit', handleSubmit);
};

export const loginSubmitHandle = e => {
  e.preventDefault();
  const username = document.querySelector('#username').value;

  if (username) {
    state.user = { username: 'testuser', email: '', bio: '' };
    localStorage.setItem('user', JSON.stringify(state.user));
    navigation('/profile');
  } else {
    alert('아이디와 비밀번호를 입력해주세요.');
  }
};

export const handleClick = e => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href')) {
    e.preventDefault();
    const path = e.target.getAttribute('href');
    navigation(path);
  }
  if (e.target.id === 'logout') {
    e.preventDefault();
    localStorage.removeItem('user');
    navigation('/login');
  }
};

export const handleSubmit = e => {
  e.preventDefault();
  if (e.target.id === 'login-form') {
    loginSubmitHandle(e);
  } else if (e.target.id === 'profile-form') {
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const bio = document.querySelector('#bio').value;
    saveProfile({ username, email, bio });
  }
};
