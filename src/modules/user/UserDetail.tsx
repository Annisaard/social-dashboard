import { DataTable } from "@/components/data-table/TableList";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useFetchAlbumByUserId,
  useFetchPostsByUserId,
  useFetchUserDetail,
} from "@/hooks/useApi";
import { getInitials } from "@/lib/utils";
import type { AlbumDetailTypes, PostTypes } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Mail, Phone, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>User ID not found</div>;
  }
  const { data: userDetail, isLoading: isUserLoading } = useFetchUserDetail(id);
  const { data: postData, isLoading: isPostLoading } =
    useFetchPostsByUserId(id);
  const { data: albumData, isLoading: isAlbumLoading } =
    useFetchAlbumByUserId(id);

  const ListPostUserColumns: ColumnDef<PostTypes>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      size: 200,
    },
    {
      id: "detail",
      header: "Detail",
      accessorKey: "detail",
      size: 340,
    },

    {
      id: "actions",
      size: 90,
      cell: ({ row }) => {
        const id = row.original.id || "";
        return (
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/posts/${id}`)}
              className="cursor-pointer">
              <Eye className="size-4 text-green-600" />
            </button>
            <button
              className="cursor-pointer"
              // onClick={() =>
              //   openDeleteModal(row.original.id, row.original.title)
              // }
            >
              <Trash className="size-4 text-red-600" />
            </button>
          </div>
        );
      },
      enableSorting: false,
    },
  ];
  const ListAlbum: ColumnDef<AlbumDetailTypes>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      size: 300,
    },

    {
      id: "actions",
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
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-gray-300 text-lg font-semibold text-primary-foreground">
            {getInitials(userDetail?.name)}
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {isUserLoading ? "Loading..." : userDetail?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              @{userDetail?.username}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="size-4 text-muted-foreground" />
            <span>{userDetail?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="size-4 text-muted-foreground" />
            <span>{userDetail?.phone}</span>
          </div>

          <div className="border-t border-gray-200 pt-3" />

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Address</span>
            <span className="text-right font-medium">
              {userDetail?.address?.street}, {userDetail?.address?.city} (
              {userDetail?.address?.zipcode})
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Company</span>
            <span className="text-right font-medium">
              {userDetail?.company?.name}
            </span>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Posts</h3>
        <DataTable
          columns={ListPostUserColumns}
          data={postData ?? []}
          isLoading={isPostLoading}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-semibold">Albums</h3>
        <DataTable
          columns={ListAlbum}
          data={albumData ?? []}
          isLoading={isAlbumLoading}
        />
      </div>
    </div>
  );
}
