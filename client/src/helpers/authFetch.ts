export const authFetch = (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("local_token");

  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, { ...options, headers });
};
