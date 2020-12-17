import axios from "axios";

const api = axios.create({
  baseURL: "https://english-talking-api.herokuapp.com",
});

export default api;
