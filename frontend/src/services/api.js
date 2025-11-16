import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Update this to your computer's IP address when testing on physical device
// Find your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
const BASE_URL = 'http://192.168.35.234:4000/api'; // Change to your IP

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor for error handling
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

// Auth Services
export const authService = {
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', {name, email, password});
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', {email, password});
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

// User Services
export const userService = {
  getProfile: async () => {
    const response = await api.get('/user/me');
    return response.data;
  },

  updateProfile: async (name, avatar) => {
    const response = await api.put('/user/me', {name, avatar});
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },
};

// Provider Services
export const providerService = {
  getAll: async () => {
    const response = await api.get('/providers');
    return response.data;
  },

  getById: async id => {
    const response = await api.get(`/providers/${id}`);
    return response.data;
  },
};

// Appointment Services
export const appointmentService = {
  getAll: async () => {
    const response = await api.get('/appointments');
    return response.data;
  },

  create: async (providerId, startTime, reason) => {
    const response = await api.post('/appointments', {
      providerId,
      startTime,
      reason,
    });
    return response.data;
  },

  getById: async id => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data;
  },

  delete: async id => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },
};

// Medication Services
export const medicationService = {
  getAll: async () => {
    const response = await api.get('/medications');
    return response.data;
  },

  create: async (name, dosage, frequency, notes) => {
    const response = await api.post('/medications', {
      name,
      dosage,
      frequency,
      notes,
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/medications/${id}`, data);
    return response.data;
  },

  delete: async id => {
    const response = await api.delete(`/medications/${id}`);
    return response.data;
  },
};

// Reminder Services
export const reminderService = {
  getAll: async () => {
    const response = await api.get('/reminders');
    return response.data;
  },

  create: async (title, medicationId, triggerTime, recurrence) => {
    const response = await api.post('/reminders', {
      title,
      medicationId,
      triggerTime,
      recurrence,
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/reminders/${id}`, data);
    return response.data;
  },

  markDone: async id => {
    const response = await api.patch(`/reminders/${id}/done`);
    return response.data;
  },

  delete: async id => {
    const response = await api.delete(`/reminders/${id}`);
    return response.data;
  },
};

// Medical Record Services
export const recordService = {
  getRecords: async () => {
    const response = await api.get('/records');
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/records');
    return response.data;
  },

  uploadRecord: async file => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });

    const response = await api.post('/records/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  upload: async file => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });

    const response = await api.post('/records/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteRecord: async id => {
    const response = await api.delete(`/records/${id}`);
    return response.data;
  },

  delete: async id => {
    const response = await api.delete(`/records/${id}`);
    return response.data;
  },
};

// Health Stats Services
export const statsService = {
  get: async () => {
    const response = await api.get('/stats');
    return response.data;
  },

  update: async data => {
    const response = await api.post('/stats', data);
    return response.data;
  },
};

export default api;
