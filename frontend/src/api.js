import axios from 'axios';

const url = new URL("/", window.location.href);

const instance = axios.create({
  baseURL: `http://localhost:5000/api`,
});

export default instance;