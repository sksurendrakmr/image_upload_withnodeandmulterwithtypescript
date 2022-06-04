import { Request, request } from "express";

export type UserDto = {
  name: string;
  email: string;
  image: string;
};

export type CustomReq<T> = Omit<Request, "body"> & {
  body: T;
};
