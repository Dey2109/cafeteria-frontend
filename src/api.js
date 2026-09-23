import axios from 'axios';

// Si hay una variable de entorno (Vercel), úsala. Si no, usa localhost (desarrollo local).
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL
});