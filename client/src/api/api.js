import axios from "axios";
import LocalStorage from "../Utils/localStorage";

const BASE_URL = "https://hotel-management-admin.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});
