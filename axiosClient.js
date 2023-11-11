import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const getToken = () => {
  try {
    let client = window.localStorage.getItem("zeslap-user");
    if (!client) return null;
    client = JSON.parse(client);
    return client["zeslap_key"];
  } catch (error) {
    throw Error(error);
  }
};

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
      localStorage.removeItem("fasilUser");
    }
    throw error;
  }
);

export default axiosClient;
