import axios from "axios";
import auth from "./authPassportService.js";

const baseURL = "http://localhost:2410";
// const baseURL = "https://gbi-bank-ggkr.onrender.com";
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

function get(url) {
  let token = auth.getToken();
  return axiosInstance.get(baseURL + url, {
    headers: { Authorization: "bearer " + token },
  });
}
function post(url, obj) {
  let token = auth.getToken();
  return axiosInstance.post(baseURL + url, obj, {
    headers: { Authorization: "bearer " + token },
  });
}
function put(url, obj) {
  let token = auth.getToken();
  return axiosInstance.put(baseURL + url, obj, {
    headers: { Authorization: "bearer " + token },
  });
}
function deleteApi(url) {
  let token = auth.getToken();
  return axiosInstance.delete(baseURL + url, {
    headers: { Authorization: "bearer " + token },
  });
}
export default {
  get,
  post,
  put,
  deleteApi,
};
