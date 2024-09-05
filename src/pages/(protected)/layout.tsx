import { redirect } from "@/router";
import { getUser } from "@/services/auth";
import { memo } from "react";
import { Outlet } from "react-router-dom";

export async function Loader() {
  const user = await getUser();
  if (!user) {
    throw redirect("/", 302);
  }
  return { user };
}

export default memo(function ProtectedLayout() {
  return <Outlet />;
});
