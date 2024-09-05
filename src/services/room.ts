import { firestore } from "@/lib/firebase";
import { type Room, RoomSchema } from "@/models/room";
import {
  addDoc,
  and,
  collection,
  or,
  orderBy,
  query,
  type Query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { executeQuery } from "./utils";

export const roomsCollection = collection(firestore, "rooms");

export function getUserRoomsQuery(userId: string) {
  return query(
    roomsCollection,
    or(where("visibility", "==", "public"), where("owner", "==", userId)),
    orderBy("createdAt", "desc"),
  );
}

export function getPrivateUserRoomsQuery(userId: string) {
  return query(
    roomsCollection,
    and(where("visibility", "==", "private"), where("owner", "==", userId)),
    orderBy("createdAt", "desc"),
  );
}

export function getPublicRoomsQuery() {
  return query(
    roomsCollection,
    where("visibility", "==", "public"),
    orderBy("createdAt", "desc"),
  );
}

export async function getRooms(query: Query) {
  return executeQuery(query, RoomSchema);
}

export async function createRoom(
  args: Pick<Room, "name" | "visibility" | "owner">,
) {
  return addDoc(roomsCollection, {
    ...args,
    createdAt: serverTimestamp(),
  });
}
