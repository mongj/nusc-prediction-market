import axios, { AxiosInstance, HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response.status === HttpStatusCode.Unauthorized && !error.config.url?.includes("auth/signin")) {
      useNavigate()("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
