
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://dan-os-backend.example.com';

export const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const apiClient = {
  async sendCopilotMessage(input: string) {
    const response = await api.post('/copilot/chat', {
      message: input,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  },

  async getAdapters() {
    const response = await api.get('/adapters');
    return response.data;
  },
};
