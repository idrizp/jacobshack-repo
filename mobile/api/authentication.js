import { api } from "./request";

export async function logIn(username, password) {
  return await api.post("/api/login", {
    username,
    password,
  });
}

export async function register(username, password) {
  return await api.post("/api/register", {
    username,
    password,
  });
}
