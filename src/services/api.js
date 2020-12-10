import axios from "axios";

const api = axios.create({
  baseURL: "https://english-talking-api-develop.herokuapp.com",
});

export default api;
