import { redirect } from "react-router";
import { checkAuth } from "./checkAuth.ts";

export const manajemenLoader = async () => {
  const authInfo = await checkAuth();
  if (!authInfo) throw redirect("/login");
  return null;
};
