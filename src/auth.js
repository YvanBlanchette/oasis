export const isAuthenticated = async () => {
  const token = localStorage.getItem('bearer_token');
  return token !== null;
};