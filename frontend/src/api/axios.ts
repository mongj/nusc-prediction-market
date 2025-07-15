import axios, { AxiosInstance, HttpStatusCode } from "axios";

const apiEvents = {
  onUnauthorized: () => {
    window.dispatchEvent(new Event("api:unauthorized"));
  },
};

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // baseURL: "http://localhost:3000", // uncomment for local testing
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === HttpStatusCode.Unauthorized && !error.config.url?.includes("auth/signin")) {
      apiEvents.onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export { api, apiEvents };
