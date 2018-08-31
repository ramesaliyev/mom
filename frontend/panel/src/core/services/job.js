import { post, get } from './core';

export const list = () => get('/job');
export const create = payload => post('/job', payload);