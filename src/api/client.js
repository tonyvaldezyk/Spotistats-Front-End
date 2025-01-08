import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Assurez-vous que c'est la bonne URL de votre API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
