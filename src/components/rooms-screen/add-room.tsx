import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddRoomForm from "./add-room-form";

export default function AddRoom() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Icon icon="hugeicons:plus-sign" className="size-4 mr-2" />
          Create Room
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Start a New Conversation Room</DialogTitle>
          <DialogDescription>
            Launch a new room and make it yours. Add a unique name and choose
            whether to make it public or keep it private.
          </DialogDescription>
        </DialogHeader>

        <AddRoomForm
          onCancel={close}
          onDone={() => {
            close();
            toast("Room created successfully");
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
