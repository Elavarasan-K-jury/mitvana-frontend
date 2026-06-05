import axios from "axios";
import { getItem } from "./localStorage";
import { getCookies, getCookie } from "cookies-next";

// export const API_ENDPOINT = `http://localhost:4000/api/v1`;
// export const API_ENDPOINT = ` http://89.116.33.140:4000/api/v1`;
export const API_ENDPOINT = `https://api.mitvana.com/api/v1`;


// export const backendUrl = "http://localhost:4000/";
// export const backendUrl = "http://89.116.33.140:4000/";
export const backendUrl = "https://api.mitvana.com/";


export const authHeader = () => {
  const token = getItem("accessToken") || getCookie("accessToken") || getCookie("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

class DataService {
  static get(path = "", includeAuth = true) {
    const headers = includeAuth ? { ...authHeader() } : {};
    return client.get(path, { headers, _includeAuth: includeAuth });
  }

  static post(path = "", data = {}, includeAuth = true, optionalHeader = {}) {
    const headers = includeAuth
      ? { ...authHeader(), ...optionalHeader }
      : optionalHeader;
    return client.post(path, data, { headers, _includeAuth: includeAuth });
  }

  static patch(path = "", data = {}, includeAuth = true) {
    const headers = includeAuth ? { ...authHeader() } : {};
    return client.patch(path, data, { headers, _includeAuth: includeAuth });
  }

  static delete(path = "", data = {}, includeAuth = true) {
    const headers = includeAuth ? { ...authHeader() } : {};
    return client.delete(path, { data, headers, _includeAuth: includeAuth });
  }

  static put(path = "", data = {}, includeAuth = true) {
    const headers = includeAuth ? { ...authHeader() } : {};
    return client.put(path, data, { headers, _includeAuth: includeAuth });
  }
}
client.interceptors.request.use((config) => {
  if (!config._includeAuth) return config;
  const token = getItem("accessToken");
  if (!token) return config;

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

export { DataService };
