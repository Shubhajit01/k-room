import { memo } from "react";
import {
  type ActionFunctionArgs,
  Form,
  type LoaderFunctionArgs,
  useLoaderData,
  useSubmit,
} from "react-router-dom";

import Decoration from "@/components/home-screen/decoration";
import AddRoom from "@/components/rooms-screen/add-room";
import RoomList from "@/components/rooms-screen/room-list";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomSchema } from "@/models/room";
import { Link, redirect } from "@/router";
import { getUser } from "@/services/auth";
import {
  createRoom,
  getPrivateUserRoomsQuery,
  getPublicRoomsQuery,
  getRooms,
  getUserRoomsQuery,
} from "@/services/room";
import { parseFormWithSchema } from "@/services/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { z } from "zod";

enum RoomTab {
  Owner = "owner",
  Private = "private",
  Public = "public",
}

const searchParamsSchema = z.object({
  tab: z.nativeEnum(RoomTab).optional().default(RoomTab.Owner),
  q: z.string().optional().default(""),
});

export async function Loader({ request }: LoaderFunctionArgs) {
  const user = await getUser();

  if (!user) {
    throw redirect("/", 302);
  }

  const url = new URL(request.url);
  const params = await searchParamsSchema.parseAsync({
    q: url.searchParams.get("q") || "",
    tab: url.searchParams.get("tab") || RoomTab.Owner,
  });

  const roomsQuery = (() => {
    switch (params.tab) {
      case RoomTab.Owner:
        return getUserRoomsQuery(user.uid);
      case RoomTab.Private:
        return getPrivateUserRoomsQuery(user.uid);
      case RoomTab.Public:
        return getPublicRoomsQuery();
      default:
        return getUserRoomsQuery(user.uid);
    }
  })();

  return {
    ...params,
    roomsQuery,
    initialRooms: await getRooms(roomsQuery),
  };
}

export async function Action({ request }: ActionFunctionArgs) {
  const user = await getUser();

  if (!user) {
    return { ok: false };
  }

  const form = await request.formData();

  const payload = await parseFormWithSchema(
    form,
    RoomSchema.pick({
      name: true,
      visibility: true,
    }),
  );

  await createRoom({ ...payload, owner: user.uid });
  return { ok: true };
}

export default memo(function RoomsPage() {
  const { roomsQuery, initialRooms, q, tab } = useLoaderData() as InferLoader<
    typeof Loader
  >;

  const submit = useSubmit();

  return (
    <div className="w-screen min-h-dvh overflow-y-auto pb-10">
      <div className="-scale-y-100 absolute -z-[1] inset-0">
        <Decoration />
      </div>

      <header>
        <nav className="container text-center">
          <Button
            asChild
            variant="outline"
            className="mt-10 rounded-full mx-auto"
          >
            <Link to="/">
              <Icon
                icon="hugeicons:arrow-left-01"
                className="size-5 -ml-2 mr-1"
              />
              <span>Go back home</span>
            </Link>
          </Button>
        </nav>
      </header>

      <section className="container relative pt-16 text-center">
        <Heading className="text-5xl animate-in fade-in slide-in-from-bottom-2">
          Join a room
        </Heading>

        <p className="text-md text-gray-600 mt-2 text-balance animate-in fade-in slide-in-from-bottom-2">
          Select a room from the below list and start a conversation
        </p>
      </section>

      <section className="mt-12 container">
        <Form
          method="GET"
          className="w-full max-w-lg mx-auto flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="relative grow">
            <Input
              name="name"
              defaultValue={q}
              placeholder="Search for a room..."
              className="h-12 peer rounded-full text-base bg-gray-25 placeholder:text-gray-400 pl-12"
            />
            <Icon
              icon="hugeicons:search-01"
              className="size-5 absolute -mt-px left-5 text-gray-400 peer-focus:text-indigo-600 top-2/4 -translate-y-2/4"
            />
          </div>
        </Form>
      </section>

      <section className="mt-8 container flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 gap-4">
        <div className="w-full max-w-lg flex justify-end items-center">
          <AddRoom />
        </div>

        <Tabs
          value={tab}
          className="max-w-lg w-full"
          onValueChange={(nextTab) => {
            submit({ q, tab: nextTab }, { method: "GET" });
          }}
        >
          <TabsList className="mx-auto w-full *:w-full">
            <TabsTrigger value={RoomTab.Owner}>My Rooms</TabsTrigger>
            <TabsTrigger value={RoomTab.Private}>Private Rooms</TabsTrigger>
            <TabsTrigger value={RoomTab.Public}>Public Rooms</TabsTrigger>
          </TabsList>
          <div className="bg-gradient-to-r from-white via-transparent to-white">
            <TabsContent value={RoomTab.Owner}>
              <RoomList query={roomsQuery} initialValue={initialRooms} />
            </TabsContent>
            <TabsContent value={RoomTab.Private}>
              <RoomList query={roomsQuery} initialValue={initialRooms} />
            </TabsContent>
            <TabsContent value={RoomTab.Public}>
              <RoomList query={roomsQuery} initialValue={initialRooms} />
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </div>
  );
});
