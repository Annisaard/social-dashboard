import { DataTable } from "@/components/data-table/TableList";
import { Button } from "@/components/ui/button";
import { useCreatePost, useDeletePost, useFetchPostList } from "@/hooks/useApi";
import type { PostTypes } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModalCreatePost } from "./components/ModalCreatePost";
import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/components/Modal";

export default function PostPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const { data: postsData, isLoading } = useFetchPostList();
  const { mutateAsync: createPost, isPending } = useCreatePost();
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      toast.success("Deleted Successfully");
      setIsOpenModalDelete(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleCreatePost = async (data: {
    title: string;
    id: number;
    body: string;
  }) => {
    try {
      await createPost({
        title: data.title,
        body: data.body,
        userId: data.id,
      });
      toast.success("Success create post");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };
  const openDeleteModal = (id: number, title: string) => {
    setSelectedPost({
      id,
      title,
    });
    setIsOpenModalDelete(true);
  };
  const ListPostColumns: ColumnDef<PostTypes>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      size: 250,
    },
    {
      id: "detail",
      header: "Detail",
      accessorKey: "body",
      size: 250,
    },

    {
      id: "actions",
      size: 90,
      cell: ({ row }) => {
        const id = row.original.id || "";
        return (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate(`${id}`)}
              className="cursor-pointer"
            >
              <Eye className="size-4 text-green-600" />
            </button>
            <button
              className="cursor-pointer"
              onClick={() =>
                openDeleteModal(row.original.id, row.original.title)
              }
            >
              <Trash className="size-4 text-red-600" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-w-0 flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>

          <p className="text-sm text-muted-foreground">
            Manage and view all posts.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <DataTable
        columns={ListPostColumns}
        data={postsData ?? []}
        isLoading={isLoading}
      />

      <ModalCreatePost
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
        isSubmitting={isPending}
      />
      <Modal
        isOpen={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        title={""}
        onSubmit={() => handleDelete(selectedPost?.id ?? 0)}
        submitText="Delete"
        disabled={isDeleting}
        showCancelBtn
      >
        <p className="pt-2">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{selectedPost?.title}</span>?
        </p>
      </Modal>
    </div>
  );
}
