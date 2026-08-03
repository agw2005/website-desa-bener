import { useEffect, useState } from "react";
import type { LoggedInInfo } from "../types/Login.d.ts";
import { serverApi } from "../helpers/serverApi.ts";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authInfo, setAuthInfo] = useState<LoggedInInfo | null>(null);
  const [authIsLoading, setAuthIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      setAuthIsLoading(true);
      try {
        const storedToken = localStorage.getItem("local_token");
        if (!storedToken) {
          setIsLoggedIn(false);
          setAuthInfo(null);
          return;
        }

        const response = await fetch(
          serverApi.get.verify(),
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );

        setIsLoggedIn(response.ok);

        if (response.ok) {
          const responseJson: LoggedInInfo = await response.json();
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

  return { isLoggedIn, authIsLoading, authInfo };
};

export default useAuth;
