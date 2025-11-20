import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getBaseUrl = () => {
  return 'https://hackathon-2-jp.vercel.app';
};

const BASE_URL = getBaseUrl();

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  },
);

export const authService = {
  register: async (name, email, password) => {
    const authApi = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await authApi.post('/api/auth/register', {name, email, password});
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  login: async (email, password) => {
    const authApi = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await authApi.post('/api/auth/login', {email, password});
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export const userService = {
  getProfile: async () => {
    const response = await api.get('/api/user/me');
    return response.data;
  },

  updateProfile: async (name, avatar) => {
    const response = await api.put('/api/user/me', {name, avatar});
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },
};

export const providerService = {
  getAll: async () => {
    const response = await api.get('/api/providers');
    return response.data;
  },

  getById: async id => {
    const response = await api.get(`/api/providers/${id}`);
    return response.data;
  },
};

export const appointmentService = {
  getAll: async () => {
    const response = await api.get('/api/appointments');
    return response.data;
  },

  create: async (providerId, startTime, reason) => {
    const response = await api.post('/api/appointments', {
      providerId,
      startTime,
      reason,
    });
    return response.data;
  },

  getById: async id => {
    const response = await api.get(`/api/appointments/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/api/appointments/${id}`, data);
    return response.data;
  },

  delete: async id => {
    const response = await api.delete(`/api/appointments/${id}`);
    return response.data;
  },
};

export const medicationService = {
  getAll: async () => {
    const response = await api.get('/api/medications');
    return response.data;
  },

  create: async (name, dosage, frequency, notes) => {
    const response = await api.post('/api/medications', {
      name,
      dosage,
      frequency,
      notes,
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/api/medications/${id}`, data);
    return response.data;
  },

  delete: async id => {
    const response = await api.delete(`/api/medications/${id}`);
    return response.data;
  },
};

export const reminderService = {
  getAll: async () => {
    const response = await api.get('/api/reminders');
    return response.data;
  },

  create: async (title, medicationId, triggerTime, recurrence) => {
    const response = await api.post('/api/reminders', {
      title,
      medicationId,
      triggerTime,
      recurrence,
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/api/reminders/${id}`, data);
    return response.data;
  },

  markDone: async id => {
    const response = await api.patch(`/api/reminders/${id}/done`);
    return response.data;
  },

  delete: async id => {
    const response = await api.delete(`/api/reminders/${id}`);
    return response.data;
  },
};

export const recordService = {
  getRecords: async () => {
    const response = await api.get('/api/records');
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/api/records');
    return response.data;
  },

  uploadRecord: async file => {
    const fileName = file.name || file.uri.split('/').pop() || `upload_${Date.now()}.${file.type.split('/')[1]}`;

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: fileName,
    });

    const response = await api.post('/api/records/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteRecord: async id => {
    const response = await api.delete(`/api/records/${id}`);
    return response.data;
  },

  delete: async id => {
    const response = await api.delete(`/api/records/${id}`);
    return response.data;
  },
};

export const statsService = {
  get: async () => {
    const response = await api.get('/api/stats');
    return response.data;
  },

  update: async data => {
    const response = await api.post('/api/stats', data);
    return response.data;
  },
};

export default api;
