import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EllipsisVertical, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useDeleteComment,
  useFetchCommentByPostId,
  useFetchPostById,
  useUpdatePost,
} from "@/hooks/useApi";
import { toast } from "sonner";
import { useState } from "react";
import Modal from "@/components/Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModalPost } from "./components/ModalPost";
import type { PostPayload } from "@/types/types";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<{
    id: number;
    email: string;
  } | null>(null);
  const { mutateAsync: updatePost, isPending } = useUpdatePost();
  const { data: postData, isLoading: isPostLoading } = useFetchPostById(
    id ?? "",
  );
  const { data: commentData, isLoading: isCommentLoading } =
    useFetchCommentByPostId(id ?? "");
  const { mutateAsync: deleteComment, isPending: isDeleting } =
    useDeleteComment();
  const { mutateAsync: deletePosts, isPending: isDeletingPosts } =
    useDeleteComment();

  const openDeleteModal = (id: number, email: string) => {
    setSelectedComment({
      id,
      email,
    });
    setIsOpenModalDelete(true);
  };
  const handleDeletePosts = async (id: number) => {
    try {
      await deletePosts(id);
      toast.success("Deleted Posts Successfully");
      setIsOpenModalDelete(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  
  const handleEditComment = () => {
    console.log;
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id);
      toast.success("Deleted Comment Successfully");
      setIsOpenModalDelete(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleUpdatePost = async (data: PostPayload) => {
    try {
      await updatePost({
        postId: id!,
        payload: data,
      });

      toast.success("Post updated");
      setIsEditOpen(false);
    } catch (error) {
      console.error("Failed to update post:", error);
      toast.error("Failed to update post");
    }
  };
  if (!id) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">Post ID not found</p>
      </div>
    );
  }

  return (
    <div className="min-w-0 flex-1 space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">
              Post #{postData?.id}
            </p>

            <CardTitle className="text-xl capitalize md:text-2xl">
              {isPostLoading ? "Loading..." : postData?.title}
            </CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                type="button"
                className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <EllipsisVertical className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem
                onClick={() => {
                  setIsEditOpen(true);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => {
                  // handle delete
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent>
          <p className="leading-7 text-gray-600">
            {isPostLoading ? "Loading..." : postData?.body}
          </p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h2 className="text-lg font-semibold">
            Comments
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({commentData?.length ?? 0})
            </span>
          </h2>
        </div>

        {isCommentLoading ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Loading comments...
            </CardContent>
          </Card>
        ) : commentData?.length ? (
          <div className="space-y-3">
            {commentData.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 space-y-3">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {comment.name}
                        </p>
                        <p className="text-sm text-gray-500">{comment.email}</p>
                      </div>

                      <p className="leading-6 text-gray-600">{comment.body}</p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                        aria-label={`Edit comment ${comment.id}`}
                        onClick={() => {
                          // handle edit
                          console.log("Edit comment:", comment.id);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        className="rounded-md p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete comment ${comment.id}`}
                        onClick={() =>
                          openDeleteModal(comment.id, comment.email)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              No comments yet.
            </CardContent>
          </Card>
        )}
      </section>
      <ModalPost
        isOpen={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        mode="edit"
        onSubmit={handleUpdatePost}
        isSubmitting={isPending}
        initialData={postData}
      />
      <Modal
        isOpen={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        title={""}
        onSubmit={() => handleDeleteComment(selectedComment?.id ?? 0)}
        submitText="Delete"
        disabled={isDeleting}
        showCancelBtn
      >
        <p className="pt-2">
          Are you sure you want to delete comment from{" "}
          <span className="font-semibold">{selectedComment?.email}</span>
        </p>
      </Modal>
    </div>
  );
}
