import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string().min(5),
  visibility: z.enum(["public", "private"]),
  owner: z.string().optional(),
  createdAt: z.instanceof(Timestamp),
});

export type Room = z.infer<typeof RoomSchema>;
