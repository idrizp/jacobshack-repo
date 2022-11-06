import { useEffect, useState } from "react";
import { isAuthenticated } from "../api/authentication";
import { getScore } from "../api/score";
import { useAuth } from "./useAuth";

export function usePoints(route) {
  const [points, setPoints] = useState(-1);
  const authenticated = useAuth(route);
  useEffect(() => {
    const reload = () => {
      if (!authenticated) {
        return;
      }
      getScore()
        .then((res) => {
          setPoints(res.data.points);
        })
        .catch((err) => {
          throw err;
        });
    };

    reload();
    const timer = setInterval(() => {
      reload();
    }, 1000);
    return () => clearInterval(timer);
  }, [authenticated, route]);
  return points;
}
