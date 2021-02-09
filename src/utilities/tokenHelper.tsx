export const setToken = (newToken: string): void => {
  localStorage.setItem('token', newToken);
};

export const getToken = (): string | null => localStorage.getItem('token');

export const removeToken = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    throw new Error(`Error removing storage: ${error}`);
  }
};
