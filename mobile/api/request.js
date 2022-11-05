import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

async function getToken() {
  const token = await AsyncStorage.getItem("token");
  return token;
}

const baseUrl = "http://localhost:3000/api";

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

authenticatedApi.interceptors.request.use(async (config) => {
  config.headers.Authorization = "Bearer " + (await getToken());
  return config;
});

authenticatedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config.url !== "login" && error.response.status === 401) {
      const navigation = useNavigation();
      navigation.navigate("Login");
    }
    return error;
  }
);
