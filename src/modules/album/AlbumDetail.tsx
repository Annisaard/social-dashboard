import { DataTable } from "@/components/data-table/TableList";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchAlbumById, useFetchPhotobyAlbumId } from "@/hooks/useApi";
import type { AlbumDetailTypes } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";

export const AlbumDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: albumDetail, isLoading: isAlbumLoading } = useFetchAlbumById(
    id ?? "",
  );

  const { data: photoData, isLoading: isPhotoLoading } = useFetchPhotobyAlbumId(
    id ?? "",
  );
  const ListPhotoColumns: ColumnDef<AlbumDetailTypes>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      size: 120,
    },
    {
      id: "thumbnail",
      header: "Thumbnail",
      accessorKey: "thumbnailUrl",
      size: 120,
      cell: ({ row }) => {
        <img src={row.original.thumbnailUrl} alt="thumbnail" />;
      },
    },
    {
      id: "image",
      header: "Image",
      accessorKey: "url",
      size: 120,
      cell: ({ row }) => {
        <img src={row.original.url} alt="img" />;
      },
    },
  ];
  return (
    <div className="min-w-0 flex-1 space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">
              Album #{albumDetail?.id}
            </p>

            <CardTitle className="text-xl capitalize md:text-2xl">
              {isAlbumLoading ? "Loading..." : albumDetail?.title}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>
      <DataTable
        columns={ListPhotoColumns}
        data={photoData ?? []}
        isLoading={isPhotoLoading}
      />
    </div>
  );
};
