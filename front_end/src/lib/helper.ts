import { useAppStore } from "@/features/store";
import axios,{AxiosInstance} from "axios";

export async function getToken() {
  const token = useAppStore.getState().token
  return token;
}

export const customAxios:AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

customAxios.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      config.headers["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.log(error)
    }

    return config;
  },
  (error) => {
    console.log(error);
  }
);