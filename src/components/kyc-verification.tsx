"use client";

import * as z from "zod";

import { useZodForm } from "@/components/use-zod-form";
import useVeriff from "@/components/use-veriff";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export default function KYCVerification() {
  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const { createSession } = useVeriff();

  const onSubmit = form.handleSubmit(async (values) => {
    await createSession({
      firstName: values.firstName,
      lastName: values.lastName,
      vendorData: "1234567890",
    });
  });

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>Verify your identity</CardTitle>
        <CardDescription>
          Verify your identity to access all features of the app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your first name as it appears on your ID
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your last name as it appears on your ID
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end space-x-2">
              <Button type="submit">Start Verification</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
