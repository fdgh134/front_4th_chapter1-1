export const state = {
  user: JSON.parse(localStorage.getItem('user')) || {
    username: '',
    email: '',
    bio: '',
  },
};

export const saveProfile = user => {
  if (JSON.stringify(state.user) !== JSON.stringify(user)) {
    state.user = { ...state.user, ...user };
    localStorage.setItem('user', JSON.stringify(state.user));

    const { username, email, bio } = state.user;
    document.querySelector('#username').value = username;
    document.querySelector('#email').value = email;
    document.querySelector('#bio').value = bio;

    alert('프로필이 업데이트되었습니다.');
  }
};

export const loadProfile = () => {
  const savedData = localStorage.getItem('user');
  if (savedData) {
    state.user = JSON.parse(savedData);
  }
};
