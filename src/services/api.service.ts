import axios from "axios";
import { API_KEY, URL_BASE } from "../lib/constants";

const api = axios.create({
  baseURL: URL_BASE,
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    "x-rapidapi-key": API_KEY,
  },
});

export default api;
