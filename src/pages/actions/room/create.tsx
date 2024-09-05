import { addRoomFromSchema } from "@/components/rooms-screen/add-room-form";
import { Navigate, redirect } from "@/router";
import { getUser } from "@/services/auth";
import { createRoom } from "@/services/room";
import { parseFormWithSchema } from "@/services/utils";
import type { ActionFunctionArgs } from "react-router-dom";

export function Loader() {
  throw redirect("/", 302);
}

export async function Action({ request }: ActionFunctionArgs) {
  const user = await getUser();

  if (!user) {
    return { ok: false };
  }

  const form = await request.formData();
  const data = await parseFormWithSchema(form, addRoomFromSchema);
  await createRoom({
    ...data,
    owner: user.uid,
  });

  return { ok: true };
}

export default function CreateRoom() {
  return <Navigate to="/" />;
}
