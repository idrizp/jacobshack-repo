import { useEffect, useState } from "react";
import { isAuthenticated } from "../api/authentication";
import { getScore } from "../api/score";
import { useAuth } from "./useAuth";

export function usePoints(route) {
  const [points, setPoints] = useState(-1);
  const authenticated = useAuth(route);
  useEffect(() => {
    if (!authenticated) {
      return;
    }
    getScore().then((res) => {
      setPoints(res.data.points);
    });
  }, [authenticated, route]);
  return points;
}
