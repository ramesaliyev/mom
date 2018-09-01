import { post, get } from './core';

export const login = payload => post('/login', payload);
export const logout = () => get('/logout');
export const register = payload => post('/register', payload);
export const renewToken = () => get('/renew-token');