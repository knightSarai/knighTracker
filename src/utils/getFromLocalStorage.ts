export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key) ? localStorage.getItem(key) : null;
};
