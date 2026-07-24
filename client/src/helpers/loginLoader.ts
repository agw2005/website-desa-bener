import { redirect } from "react-router";
import { checkAparaturAuth } from "./checkAparaturAuth.ts";

export const loginLoader = async () => {
  const isAuthorized = await checkAparaturAuth();
  if (isAuthorized) {
    throw redirect("/");
  }
  return null;
};
