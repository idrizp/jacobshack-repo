import { authenticatedApi } from "./request";

export async function sendBarcodeData(data) {
  return authenticatedApi.post("/leaderboard/entry", {
    data,
  });
}

export async function getScore() {
  return authenticatedApi.get("/me");
}
