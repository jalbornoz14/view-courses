import axios from "axios";

export const serviceApi = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});
