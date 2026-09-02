import { DataTable } from "@/components/data-table/TableList";
import { useFetchAlbumList } from "@/hooks/useApi";
import type { AlbumDetailTypes, AlbumTypes } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AlbumPage() {
  const { data: albumData, isLoading } = useFetchAlbumList();
  console.log(albumData, "cek");
  const navigate = useNavigate();
  const ListAlbum: ColumnDef<AlbumTypes>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      size: 120,
    },

    {
      id: "actions",
      header: "Actions",
      size: 90,
      cell: ({ row }) => {
        const id = row.original.id || "";
        return (
          <button onClick={() => navigate(`${id}`)}>
            <Eye />
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable
        columns={ListAlbum}
        data={albumData ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
