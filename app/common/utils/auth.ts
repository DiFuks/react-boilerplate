const LOCAL_STORAGE_KEY = 'JWT';

export const auth = {
  login: (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
    location.reload();
  },
  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    location.reload();
  },
  isAuth: () => !!localStorage.getItem(LOCAL_STORAGE_KEY),
  token: () => localStorage.getItem(LOCAL_STORAGE_KEY),
};
