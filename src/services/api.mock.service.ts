import axios from "axios";
import { URL_MOCK } from "../lib/constants";

const apiMock = axios.create({
  baseURL: URL_MOCK,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiMock;
