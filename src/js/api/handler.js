import axios from "axios";
export default function fetch(options) {
  return new Promise((resolve, reject) => {
    let header = {};
    let accesstoken = sessionStorage.getItem("token");
    header.Authorization = `Bearer ${accesstoken}`;
    if (options.jsonData) {
      header["Content-Type"] = "application/json";
    }
    axios({
      url: "http://localhost:9000/api/v1" + options.url,
      method: options.method,
      params: options.params,
      data: options.body,
      headers: header,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        if (e.response.data.statusCode === 401) {
          sessionStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        reject(e.response.data);
      });
  });
}
