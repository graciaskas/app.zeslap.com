import axios from "axios";
import { getToken, parseJwt, setToken } from "../utilities/utilities";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_URI,
  headers: {
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  (request) => {
    const token = getToken();
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status == 401 || response.status == 403) {
      localStorage.removeItem("zeslap-user");
    }
    throw error;
  }
);

export default axiosClient;
