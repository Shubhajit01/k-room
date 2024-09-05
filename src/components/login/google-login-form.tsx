import { Icon } from "@iconify/react";
import { Form } from "react-router-dom";
import { Button } from "../ui/button";

export default function GoogleLoginForm() {
  return (
    <Form method="POST" className="w-full">
      <input type="hidden" name="intent" value="google" />
      <Button type="submit" variant="outline" size="lg" className="w-full">
        <Icon icon="logos:google-icon" className="size-4 inline-block mr-3" />
        Sign in with Google
      </Button>
    </Form>
  );
}
