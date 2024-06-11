import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:4800/api",
  withCredentials: true,
});

export default apiRequest;