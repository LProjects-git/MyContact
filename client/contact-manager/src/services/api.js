import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
});

export const register = (userInfo) =>
  apiClient.post('/auth/register', userInfo);

export const login = (credentials) =>
  apiClient.post('/auth/login', credentials);

export const getContacts = (token) =>
  apiClient.get('/contact', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addContact = (contact, token) =>
  apiClient.post('/contact', contact, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateContact = (id, contact, token) =>
  apiClient.patch(`/contact/${id}`, contact, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteContact = (id, token) =>
  apiClient.delete(`/contact/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });