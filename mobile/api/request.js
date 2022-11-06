import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export async function getToken() {
  const token = await AsyncStorage.getItem("token");
  return token;
}

const baseUrl = "http://192.168.137.223:3232";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authenticatedApi = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

authenticatedApi.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = "Bearer " + (await getToken());
    return config;
  },
  (error) => error
);

authenticatedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const navigation = useNavigation();
      navigation.navigate("Login");
    }
    return Promise.reject(error);
  }
);
