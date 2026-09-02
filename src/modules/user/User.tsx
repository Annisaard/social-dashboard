import { DataTable } from "@/components/data-table/TableList";
import { useFetchUserList } from "@/hooks/useApi";
import type { UserTypes } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const { data: userData, isLoading } = useFetchUserList();
  const navigate = useNavigate();
  const ListUserColumns: ColumnDef<UserTypes>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
      size: 120,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      size: 120,
    },
    {
      id: "phone",
      accessorKey: "phone",
      header: "Phone",
    },
    {
      id: "cpmpany",
      header: "Company",
      cell: ({ row }) => {
        <span className="">{row.original.company.name}</span>;
      },
    },
    {
      id: "actions",
      size: 90,
      cell: ({ row }) => {
        const id = row.original.id || "";
        return (
          <button onClick={() => navigate(`${id}`)} className="cursor-pointer">
            <Eye className="size-4 text-green-600" />
          </button>
        );
      },
      enableSorting: false,
    },
  ];

  return (
    <div className="min-w-0 flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>

        <p className="text-sm text-muted-foreground">
          Manage and view all user.
        </p>
      </div>
      <DataTable
        columns={ListUserColumns}
        data={userData ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
