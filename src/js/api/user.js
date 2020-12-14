import fetch from "./handler";

export const login = (body) => {
  const url = `/auth`;
  return fetch({
    method: "POST",
    url,
    body,
    jsonData: true,
  });
};

export const logout = () => {
  const url = `/logout`;
  return fetch({
    method: "POST",
    url,
  });
};
