export const setToken = (newToken: string): void => {
  localStorage.setItem('v7Token', newToken);
};

export const getToken = (): string | null => localStorage.getItem('v7Token');

export const removeToken = (key = 'v7Token') => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    throw new Error(`Error removing storage: ${error}`);
  }
};
