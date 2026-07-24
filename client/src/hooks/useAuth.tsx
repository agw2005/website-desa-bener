import { useEffect, useState } from "react";
import type { JwtPayload } from "../types/Aparatur.d.ts";

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [authInfo, setAuthInfo] = useState<JwtPayload | null>(null);
  const [authIsLoading, setAuthIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      setAuthIsLoading(true);
      try {
        const storedToken = localStorage.getItem("local_token");
        if (!storedToken) {
          setIsAuthorized(false);
          setAuthInfo(null);
          return;
        }

        const response = await fetch(
          `http://${globalThis.location.hostname}:8000/aparatur/verifikasi`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );

        setIsAuthorized(response.ok);

        if (response.ok) {
          const responseJson: JwtPayload = await response.json();
          setAuthInfo(responseJson);
        } else {
          console.error(response.status);
          localStorage.removeItem("local_token");
          setAuthInfo(null);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("local_token");
        setAuthInfo(null);
      } finally {
        setAuthIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return { isAuthorized, authIsLoading, authInfo };
};

export default useAuth;
