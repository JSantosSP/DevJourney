import axios from 'axios';

// Configuración de Axios
const apiClient = axios.create({
  baseURL: 'https://jsantossp.pythonanywhere.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// Interceptor de solicitud
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores global
    if (error.response) {
      // La solicitud se completó y el servidor respondió con un código de estado fuera del rango de 2xx
      console.error('Error de respuesta:', error.response.data);
    } else if (error.request) {
      // La solicitud se completó pero no se recibió ninguna respuesta
      console.error('Error de solicitud:', error.request);
    } else {
      // Ocurrió un error al configurar la solicitud
      console.error('Error de configuración:', error.message);
    }
    return Promise.reject(error);
  }
);

// Métodos para interactuar con la API
const api = {
  get: (url, params) => apiClient.get(url, { params }),
  post: (url, data) => apiClient.post(url, data),
  put: (url, data) => apiClient.put(url, data),
  delete: (url) => apiClient.delete(url),
};

export default api;
