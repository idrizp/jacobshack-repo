import { authenticatedApi } from "./request";

export async function sendBarcodeData(data) {
  return authenticatedApi.post("/leaderboard/entry", {
    data,
  });
}

export async function getTopScores(page = 1) {
  return authenticatedApi.get(`/leaderboard/${page}`);
}

export async function getScore() {
  return authenticatedApi.get("/me");
}
