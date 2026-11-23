import axios from "axios";

const CLAVE_SESION = "milsabores_sesion";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  const guardada = sessionStorage.getItem(CLAVE_SESION);
  if (guardada) {
    const { token } = JSON.parse(guardada);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const url = error.config?.url ?? "";
    const esLogin = url.includes("/auth/login");
    const habiaSesion = sessionStorage.getItem(CLAVE_SESION);

    if (error.response?.status === 401 && !esLogin && habiaSesion) {
      sessionStorage.removeItem(CLAVE_SESION);
      window.dispatchEvent(new Event("sesion-cambiada"));
      window.location.assign("/login");
    }

    return Promise.reject(error);
  }
);

export default api;