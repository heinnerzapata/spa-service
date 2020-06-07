export const setToken = (newToken: string) => {
  localStorage.setItem("token", newToken);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
