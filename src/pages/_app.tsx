import { auth } from "@/lib/firebase";
import { getUser } from "@/services/auth";
import { memo, useEffect } from "react";
import { Outlet, useRevalidator, useRouteLoaderData } from "react-router-dom";

export async function Loader() {
  return {
    user: await getUser(),
  };
}

export function useRootData() {
  return useRouteLoaderData("0") as Awaited<ReturnType<typeof Loader>>;
}

export default memo(function RootApp() {
  const { revalidate } = useRevalidator();
  useEffect(() => {
    return auth.onAuthStateChanged(revalidate);
  }, [revalidate]);

  return <Outlet />;
});
