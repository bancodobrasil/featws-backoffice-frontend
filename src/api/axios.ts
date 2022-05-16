import axios from 'axios';
import { API_URL } from '../constants';

// Axios instance used for all public routes of the API
const publicAPI = axios.create({ baseURL: API_URL });
publicAPI.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

export { publicAPI };
