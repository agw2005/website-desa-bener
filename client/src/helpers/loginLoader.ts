import { redirect } from "react-router";
import { checkAuth } from "./checkAuth.ts";

export const loginLoader = async () => {
  const isLoggedIn = await checkAuth();
  if (isLoggedIn) {
    throw redirect("/");
  }
  return null;
};
