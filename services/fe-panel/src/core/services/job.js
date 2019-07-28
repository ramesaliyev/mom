import { post, get } from './core';

export const create = payload => post('/job', payload);
export const list = payload => get('/job/my', payload);