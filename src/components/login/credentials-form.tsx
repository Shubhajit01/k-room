import {
  FormControl,
  FormItem,
  FormLabel,
  Form as FormProvider,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const LoginFormSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

type LoginFormSchema = z.infer<typeof LoginFormSchema>;

export default function CredentialsForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  return (
    <FormProvider {...form}>
      <Form method="POST" className="w-full flex flex-col gap-2.5">
        <input type="hidden" name="intent" value="credentials" />
        <Controller
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button size="lg" className="mt-2">
          Login
        </Button>
      </Form>
    </FormProvider>
  );
}
