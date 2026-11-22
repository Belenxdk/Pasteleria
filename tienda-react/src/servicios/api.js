import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  const guardada = sessionStorage.getItem("milsabores_sesion");
  if (guardada) {
    const { token } = JSON.parse(guardada);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;