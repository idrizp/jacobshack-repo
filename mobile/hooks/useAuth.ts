import { useState, useEffect } from "react";
import { isAuthenticated } from "../api/authentication";

export function useAuth(router) {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    isAuthenticated()
      .then((res) => {
        setAuthenticated(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => setAuthenticated(false);
  }, [router]);
  return authenticated;
}
