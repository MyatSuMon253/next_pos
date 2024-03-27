"use client";

import { addUser } from "@/app/_features/_users/userReducer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

export interface UserFormValues {
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

export const permissions = [
  {
    label: "READ",
    value: "Read",
  },
  {
    label: "WRITE",
    value: "Write",
  },
  {
    label: "UPDATE",
    value: "Update",
  },
  {
    label: "DELETE",
    value: "Delete",
  },
];

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email("Please enter valid email address"),
  role: z.string({ required_error: "Please select a role" }),
  permissions: z.array(z.string()).optional(),
});

const CreateUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      permissions: ["read"],
    },
    mode: "onChange",
  });

  function onSubmit(data: UserFormValues) {
    dispatch(addUser({ ...data, id: users.length }));
    toast("user added successfully");
    router.push("/users");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                nickname. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" {...field} />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your email settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="user">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select a role</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permissions"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex space-x-2">
                  {permissions.map((per) => (
                    <div key={per.label} className="flex space-x-1">
                      <Checkbox
                        checked={field.value?.includes(per.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, per.value])
                            : field.value?.filter((val) => val !== per.value);
                        }}
                      />
                      <FormLabel>{per.label}</FormLabel>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormDescription>
                Select the permissions for user.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateUser;
