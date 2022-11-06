import { useState, useEffect } from "react";
import { isAuthenticated } from "../api/authentication";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    isAuthenticated().then((res) => {
      setAuthenticated(res);
    });
  }, []);
  return authenticated;
}
