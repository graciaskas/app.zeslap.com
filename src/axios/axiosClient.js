import axios from "axios";
import { getToken, parseJwt, setToken } from "../utilities/utilities";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    console.log(response.data);
    if (response.status === 401) {
      localStorage.removeItem("zeslap_key");
    }
    throw error;
  }
);

export default axiosClient;
