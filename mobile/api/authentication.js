import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./request";

export async function logIn(username, password) {
  return api.post("/login", {
    username,
    password,
  });
}

export async function register(username, password) {
  return api.post("/register", {
    username,
    password,
  });
}

export async function isAuthenticated() {
  return (await AsyncStorage.getItem("token")) != null;
}
