import axios from "axios";
import { baseURL } from "../constants/api";

const http = axios.create({
  baseURL: baseURL,
  timeout: 5000
});

export default http;
