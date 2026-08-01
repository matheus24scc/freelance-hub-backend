import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: { email: string; password: string; name: string; role: 'CLIENT' | 'FREELANCER' }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  profile: () => api.get('/auth/profile'),
};

export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id: number) => api.get(`/users/${id}`),
  update: (id: number, data: Partial<{ email: string; name: string }>) =>
    api.patch(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
};

export const gigsAPI = {
  getAll: () => api.get('/gigs'),
  getById: (id: number) => api.get(`/gigs/${id}`),
  create: (data: {
    title: string;
    description: string;
    price: number;
    contractType: 'FIXED' | 'HOURLY';
    deliveryTime: number;
    skills: string[];
  }) => api.post('/gigs', data),
  update: (id: number, data: Partial<{
    title: string;
    description: string;
    price: number;
    contractType: 'FIXED' | 'HOURLY';
    deliveryTime: number;
    skills: string[];
    isActive: boolean;
  }>) => api.patch(`/gigs/${id}`, data),
  delete: (id: number) => api.delete(`/gigs/${id}`),
};

export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getById: (id: number) => api.get(`/orders/${id}`),
  create: (data: {
    title: string;
    description: string;
    budget: number;
    clientId: number;
    freelancerId?: number;
    gigId?: number;
  }) => api.post('/orders', data),
  update: (id: number, data: Partial<{
    title: string;
    description: string;
    budget: number;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    freelancerId?: number;
    gigId?: number;
  }>) => api.patch(`/orders/${id}`, data),
  delete: (id: number) => api.delete(`/orders/${id}`),
};

export const messagesAPI = {
  getAll: () => api.get('/messages'),
  getById: (id: number) => api.get(`/messages/${id}`),
  create: (data: { senderId: number; receiverId: number; content: string }) =>
    api.post('/messages', data),
  update: (id: number, data: Partial<{ content: string; read: boolean }>) =>
    api.patch(`/messages/${id}`, data),
  delete: (id: number) => api.delete(`/messages/${id}`),
};

export const paymentsAPI = {
  getAll: () => api.get('/payments'),
  getById: (id: number) => api.get(`/payments/${id}`),
  create: (data: { amount: number; orderId: number; userId: number }) =>
    api.post('/payments', data),
  update: (id: number, data: Partial<{ amount: number }>) =>
    api.patch(`/payments/${id}`, data),
  delete: (id: number) => api.delete(`/payments/${id}`),
};
