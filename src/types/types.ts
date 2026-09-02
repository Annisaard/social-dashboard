export interface UserTypes {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface PostTypes {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface PostPayload {
  userId: number;
  title: string;
  body: string;
}
export interface AlbumTypes {
  userId: number;
  id: number;
  title: string;
}

export interface AlbumDetailTypes {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface CommentTypes {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
