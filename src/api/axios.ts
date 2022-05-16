import axios from 'axios';
import { API_URL } from '../constants';

const baseURL = API_URL || 'http://featws-api.cfe.desenv.bb.com.br/api/v1/rulesheets';
// Axios instance used for all public routes of the API
const publicAPI = axios.create({ baseURL });
publicAPI.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

export { publicAPI };
