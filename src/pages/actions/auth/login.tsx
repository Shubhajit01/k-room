import { LoginFormSchema } from "@/components/login/credentials-form";
import { redirect } from "@/router";
import { loginWithCredentials, loginWithGoogle } from "@/services/auth";
import { parseFormWithSchema } from "@/services/utils";
import type { ActionFunctionArgs } from "react-router-dom";

export async function Loader() {
  console.log("Redirecting");
  throw redirect("/");
}

export async function Action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const intent = form.get("intent");
  try {
    switch (intent) {
      case "google": {
        const user = await loginWithGoogle();
        return { user };
      }
      case "credentials": {
        const { email, password } = await parseFormWithSchema(
          form,
          LoginFormSchema,
        );
        const user = await loginWithCredentials(email, password);
        return { user };
      }
      default: {
        return null;
      }
    }
  } catch {
    return { ok: false };
  }
}

export default function LoginPage() {
  return <>Login</>;
}
