import { useRootData } from "@/pages/_app";

export function useOptionalUser() {
  const { user } = useRootData();
  return user;
}

export function useUser() {
  const user = useOptionalUser();
  if (!user) throw new Error("User not found");
  return user;
}

export function useIsLoggedIn() {
  return !!useOptionalUser();
}
