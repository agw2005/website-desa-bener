import type { LoggedInInfo } from "../types/Login.d.ts";

export const checkAuth = async (): Promise<null | LoggedInInfo> => {
  const storedToken = localStorage.getItem("local_token");
  if (!storedToken) return null;

  try {
    const response = await fetch(
      `http://${globalThis.location.hostname}:8000/verifikasi`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${storedToken}` },
      },
    );

    if (!response.ok) {
      localStorage.removeItem("local_token");
      return null;
    }

    const body: LoggedInInfo = await response.json();

    return body;
  } catch (err) {
    console.error(err);
    localStorage.removeItem("local_token");
    return null;
  }
};
