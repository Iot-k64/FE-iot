import axios from 'axios';
const URL = process.env.URL || '';
const instanceAxios = axios.create({
  baseURL: `${URL}/api`,
  timeout: 300000,
  cache: 'no-cache'
});

export default instanceAxios;