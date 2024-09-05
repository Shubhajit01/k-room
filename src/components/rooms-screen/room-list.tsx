import useWatchStore from "@/hooks/use-watch-store";
import { createAvatarInitials, formatTimestamp } from "@/lib/utils";
import { type Room, RoomSchema } from "@/models/room";
import { Link } from "@/router";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { Query } from "firebase/firestore";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface RoomListProps {
  query: Query;
  initialValue: Room[];
}

export default function RoomList({ query, initialValue }: RoomListProps) {
  const rooms = useWatchStore(initialValue, query, RoomSchema);

  if (!rooms.length) {
    return (
      <div className="aspect-[4] bg-white border rounded-lg flex flex-col items-center justify-center">
        <span>
          <Icon
            icon="hugeicons:no-meeting-room"
            className="size-10 text-gray-300"
          />
        </span>
        <div className="text-gray-400 mt-1">No rooms available</div>
      </div>
    );
  }

  return (
    <ul className="w-full border rounded-lg divide-y">
      {rooms.map((room) => (
        <li
          key={room.id}
          className="relative px-4 py-3 gap-6 text-sm flex items-center font-medium bg-gray-50/20 transition-colors hover:bg-gray-50/80"
        >
          <div>
            <Avatar>
              <AvatarFallback className="bg-indigo-50 text-indigo-600">
                {createAvatarInitials(room.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-1.5 grow">
            <p className="text-sm">{room.name}</p>
            <div className="space-x-2">
              <Badge variant="outline">{room.visibility}</Badge>
              <Badge variant="outline">{formatTimestamp(room.createdAt)}</Badge>
            </div>
          </div>

          <Link
            to="/"
            aria-label="open chat room"
            className="absolute inset-0 flex items-center justify-end px-4"
          >
            <Icon
              icon="hugeicons:arrow-right-01"
              className="size-6 text-gray-400"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
