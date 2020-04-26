import axios from 'axios'

let config = {
  baseURL: ''
};
const clienteAPI = axios.create(config);

export default clienteAPI;
