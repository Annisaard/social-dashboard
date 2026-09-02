import axiosInstance from "@/repositories/globalFetcher";

export const get = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
export const post = (url: string, body: unknown) =>
  axiosInstance.post(url, body).then((res) => res.data);
export const put = (url: string, body: unknown) =>
  axiosInstance.put(url, body).then((res) => res.data);
export const del = (url: string) =>
  axiosInstance.delete(url).then((res) => res.data);
