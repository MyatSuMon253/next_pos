"use client";

import { editUser } from "@/app/_features/_users/userReducer";
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
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { User } from "../../columns";
import { UserFormValues, permissions, userFormSchema } from "../../create/page";

const EditUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug: id } = useParams();
  const users = useSelector((state: any) => state.users);
  const existingUser = users.filter((u: User) => u.id === Number(id)+1)[0];

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: existingUser,
    mode: "onChange",
  });

  function onSubmit(data: UserFormValues) {
    dispatch(editUser({...data, id: existingUser.id , }));
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
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
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
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <div className="flex space-x-2">
                    {permissions.map((per) => (
                      <div key={per.label} className="flex space-x-1">
                        <Checkbox
                          checked={field.value.includes(per.value)}
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
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditUser;
