import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000';

const axiosinstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {'Access-Control-Allow-Origin': '*'}
});

const authorizedinstance = (token:string) => axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token}
});

export { authorizedinstance,axiosinstance };
