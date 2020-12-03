import axios from "axios";

const api = axios.create({
  baseURL: "https://english-talking-api-staging.herokuapp.com/",
});

export default api;
