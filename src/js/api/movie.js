import fetch from "./handler";

export const getMovie = (params) => {
  const url = `/movies`;
  return fetch({
    method: "GET",
    url,
    params,
  });
};

export const addMovie = (body) => {
  const url = `/movies`;
  return fetch({
    method: "POST",
    url,
    body,
    jsonData: true,
  });
};

export const updateMovie = (body, id) => {
  const url = `/movies/${id}`;
  return fetch({
    method: "PUT",
    url,
    body,
    jsonData: true,
  });
};

export const deleteMovie = (id) => {
  const url = `/movies/${id}`;
  return fetch({
    method: "DELETE",
    url,
    jsonData: true,
  });
};
