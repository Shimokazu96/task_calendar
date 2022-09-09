import axios from "axios";

export const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true,
});
