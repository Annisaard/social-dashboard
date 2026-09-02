import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, post, put, del } from "@/repositories/fetcher";
import { configs } from "@/repositories/configs";
import type {
  AlbumDetailTypes,
  AlbumTypes,
  CommentTypes,
  PostPayload,
  PostTypes,
  UserTypes,
} from "@/types/types";

export function useFetchUserList() {
  return useQuery<UserTypes[]>({
    queryKey: ["user"],
    queryFn: () => get(configs.endpointUsers),
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export function useFetchUserDetail(userId: string) {
  return useQuery<UserTypes>({
    queryKey: ["user", userId],
    queryFn: () => get(`${configs.endpointUsers}/${userId}`),
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export function useFetchPostsByUserId(userId: string) {
  return useQuery<PostTypes[]>({
    queryKey: ["posts", userId],
    queryFn: () => get(`${configs.endpointUsers}/${userId}/posts`),
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export function useFetchAlbumByUserId(userId: string) {
  return useQuery<AlbumDetailTypes[]>({
    queryKey: ["album", userId],
    queryFn: () => get(`${configs.endpointUsers}/${userId}/albums`),
    refetchOnWindowFocus: false,
    retry: false,
  });
}

// ========== POST ============== //
export function useFetchPostList() {
  return useQuery<PostTypes[]>({
    queryKey: ["post"],
    queryFn: () => get(configs.endpointPosts),
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export function useFetchPostById(id: string) {
  return useQuery<PostTypes>({
    queryKey: ["post", id],
    queryFn: () => get(`${configs.endpointPosts}/${id}`),
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PostPayload) => {
      const { data } = await post(configs.endpointPosts, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}
export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: number) => {
      const { data } = await del(`${configs.endpointPosts}/${postId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      payload,
    }: {
      postId: string;
      payload: PostPayload;
    }) => {
      const { data } = await put(`${configs.endpointPosts}/${postId}`, payload);

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });
}

// ========== ALBUM ============== //
export function useFetchAlbumList() {
  return useQuery<AlbumTypes[]>({
    queryKey: ["post"],
    queryFn: () => get(configs.endpointAlbums),
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export function useFetchAlbumById(id: string) {
  return useQuery<AlbumDetailTypes>({
    queryKey: ["post", id],
    queryFn: () => get(`${configs.endpointAlbums}/${id}`),
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export function useFetchPhotobyAlbumId(id: string) {
  return useQuery<AlbumDetailTypes[]>({
    queryKey: ["photo", id],
    queryFn: () => get(`${configs.endpointAlbums}/${id}/photos`),
    refetchOnWindowFocus: false,
    retry: false,
  });
}

// ========== Comment ============== //
export function useFetchCommentByPostId(postId: string) {
  return useQuery<CommentTypes[]>({
    queryKey: ["comment", postId],
    queryFn: () => get(`${configs.endpointComments}?postId=${postId}`),
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await del(`${configs.endpointComments}/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });
}
