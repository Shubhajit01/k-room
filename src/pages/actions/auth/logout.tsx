import { redirect } from "@/router";
import { logout } from "@/services/auth";

export async function Action() {
  try {
    await logout();
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function Loader() {
  throw redirect("/");
}

export default function () {
  return <>None</>;
}
