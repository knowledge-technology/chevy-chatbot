import axios from "axios";

const api = axios.create({
  baseURL: "http://english-talking-api.herokuapp.com/",
});

export default api;
