import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";
import { useSelector } from "react-redux";
import { columns } from "./columns";
import Link from "next/link";

const UserListPage = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/next.svg"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/next.svg"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          </div>
        </div>
        <div>
          <Link href="/users/create"><Button>Create User</Button></Link>
        </div>
        <DataTable columns={columns} data={users} />
      </div>
    </>
  );
};

export default UserListPage;
