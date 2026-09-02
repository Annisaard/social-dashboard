import { DataTable } from "@/components/data-table/TableList";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useFetchAlbumByUserId,
  useFetchPostsByUserId,
  useFetchUserDetail,
} from "@/hooks/useApi";
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

  const { data: userDetail, isLoading } = useFetchUserDetail(id);
  const { data: postData } = useFetchPostsByUserId(id);
  const { data: albumData } = useFetchAlbumByUserId(id);

  const ListPostUserColumns: ColumnDef<PostTypes>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      size: 120,
    },
    {
      id: "detail",
      header: "Detail",
      accessorKey: "body",
      size: 120,
    },

    {
      id: "actions",
      header: "Actions",
      size: 90,
      cell: ({ row }) => {
        const id = row.original.id || "";
        return (
          <div>
            <button onClick={() => navigate(`${id}`)}>
              <Eye />
            </button>
            <button>
              <Trash />
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
      <Card>
        <CardHeader>
          <div className="size-5 rounded-full">SJ</div>
        </CardHeader>
        <CardContent>
          <h5>{userDetail?.name}</h5>
          <div className="flex items-center gap-1">
            <Mail className="size-3" />
            <p>{userDetail?.email}</p>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="size-3" />
            <p>{userDetail?.phone}</p>
          </div>
          <div className="w-full border-t border-gray-300" />
          <div className="flex justify-between">
            <p>Address</p>
            <p>{userDetail?.address.city}</p>
          </div>
          <div className="flex justify-between">
            <p>Company</p>
            <p>
              {userDetail?.address?.city}, {userDetail?.address?.street} (
              {userDetail?.address?.zipcode})
            </p>
          </div>
        </CardContent>
      </Card>
      <div>
        <h2>Post</h2>
        <DataTable
          columns={ListPostUserColumns}
          data={postData ?? []}
          isLoading={isLoading}
        />
      </div>
      <div>
        <h2>Album</h2>
        <DataTable
          columns={ListAlbum}
          data={albumData ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
