import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 300000,
  cache: 'no-cache'
});

export default instanceAxios;