import { RoomSchema } from "@/models/room";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetcher } from "react-router-dom";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddRoomFormProps {
  onDone: () => void;
  onCancel: () => void;
}

export const addRoomFromSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter a name for the room")
    .min(5, "Room name must be atleast 5 characters long"),
  visibility: RoomSchema.shape.visibility,
});

type AddRoomFormSchema = z.infer<typeof addRoomFromSchema>;

export default function AddRoomForm({ onDone, onCancel }: AddRoomFormProps) {
  const createRoomFetcher = useFetcher();

  const isSubmitting = createRoomFetcher.state === "submitting";

  const form = useForm<AddRoomFormSchema>({
    disabled: isSubmitting,
    resolver: zodResolver(addRoomFromSchema),
    defaultValues: {
      name: "",
      visibility: "public",
    },
  });

  useEffect(() => {
    if (createRoomFetcher.formData && !isSubmitting) {
      onDone();
    }
  }, [isSubmitting, createRoomFetcher, onDone]);

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => {
          createRoomFetcher.submit(values, {
            method: "POST",
            action: "/actions/room/create",
          });
        })}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Must be atleast 5 characters long
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="visibility"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Visibility</FormLabel>
              <Select
                disabled={field.disabled}
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="secondary"
          className="w-full !mt-6"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full !mt-2.5 relative"
        >
          {isSubmitting ? (
            <Icon
              icon="svg-spinners:bars-rotate-fade"
              className="size-5 absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4"
            />
          ) : (
            <div>Submit</div>
          )}
        </Button>
      </form>
    </Form>
  );
}
