import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000';

// Used for API calls not requiring authentication.
const axiosinstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {'Access-Control-Allow-Origin': '*'}
});

// Used for API calls needing authentication. Takes in token as argument.
const authorizedinstance = (token:string) => axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token}
});

export { authorizedinstance, axiosinstance };
