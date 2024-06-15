import axios from 'axios';
const iaxios = axios.create({
  withCredentials: true,
});
export default iaxios;
