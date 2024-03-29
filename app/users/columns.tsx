"use client";

import TableRowActions from "@/components/ui/table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row: any) => (
      <TableRowActions
        row={row}
        renderMenuItems={(r: any) => {
          return <Link href={`/users/${r.row.id}/edit`}>Edit User</Link>;
        }}
      />
    ),
  },
];
