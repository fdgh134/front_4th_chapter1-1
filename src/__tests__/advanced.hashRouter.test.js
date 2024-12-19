import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

beforeAll(async () => {
  // DOM 초기화
  window.alert = vi.fn();
  document.body.innerHTML = '<div id="root"></div>';
  await import('../main.hash.js');
});

afterAll(() => {
  // 각 테스트 전에 root 엘리먼트 초기화
  document.getElementById('root').innerHTML = '';
  localStorage.removeItem('user');
});

const goTo = path => {
  window.location.hash = path;
  window.dispatchEvent(new Event('hashchange'));
};

describe('심화과제 > 해시 라우터 테스트', () => {
  describe('1. 라우팅 구현', () => {
    it('"/" 경로로 접근하면 홈 페이지가 렌더링된다', async () => {
      goTo('#/');

      setTimeout(() => {
        const headers = [...document.querySelectorAll('header')];
        expect(headers.length).toBe(1);
        expect(headers[0].innerHTML.includes('항해플러스')).toBe(true);
      }, 100);
    });

    it('"/login" 경로로 접근하면 로그인 페이지가 렌더링된다', async () => {
      goTo('#/login');

      setTimeout(() => {
        const submitButtons = [
          ...document.querySelectorAll("form button[type='submit']"),
        ];
        expect([...document.querySelectorAll('header')].length).toBe(0);
        expect(submitButtons.length).toBe(1);
        expect(submitButtons[0].innerHTML.includes('로그인')).toBe(true);
      }, 100);
    });

    it('로그인이 되지 않은 상태에서 "/profile" 경로로 접근하면, 로그인 페이지로 리다이렉션 된다.', () => {
      // 로그인 상태 시뮬레이션
      goTo('#/profile');

      setTimeout(() => {
        const submitButtons = [
          ...document.querySelectorAll("form button[type='submit']"),
        ];
        expect([...document.querySelectorAll('header')].length).toBe(0);
        expect(submitButtons.length).toBe(1);
        expect(submitButtons[0].innerHTML.includes('로그인')).toBe(true);
      }, 100);
    });

    it('존재하지 않는 경로로 접근하면 404 페이지가 렌더링된다', () => {
      goTo('/nonexistent');
      setTimeout(() => {
        expect(document.body.innerHTML).toContain('404');
      }, 100);
    });
  });
});
