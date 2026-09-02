import { DataTable } from "@/components/data-table/TableList";
import { useFetchAlbumList } from "@/hooks/useApi";
import type { AlbumTypes } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AlbumPage() {
  const { data: albumData, isLoading } = useFetchAlbumList();
  const navigate = useNavigate();
  const ListAlbum: ColumnDef<AlbumTypes>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      size: 400,
    },

    {
      id: "actions",
      header: "Actions",
      size: 90,
      cell: ({ row }) => {
        const id = row.original.id || "";
        return (
          <button
            onClick={() => navigate(`/albums/${id}`)}
            className="cursor-pointer">
            <Eye className="size-4 text-green-600" />
          </button>
        );
      },
    },
  ];

  return (
    <div className="min-w-0 flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Album</h1>

        <p className="text-sm text-muted-foreground">
          Manage and view all user.
        </p>
      </div>
      <DataTable
        columns={ListAlbum}
        data={albumData ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
