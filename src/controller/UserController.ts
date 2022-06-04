import { Request, Response } from "express";
import { CustomReq, UserDto } from "../dto/UserDto";
import { User } from "../models/User";

export const getUser = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const saveUser = async (req: CustomReq<UserDto>, res: Response) => {
  console.log(req.file);

  if (req.file) req.body.image = req.file.filename;
  const savedUser = await User.create(req.body);
  res.status(201).json(savedUser);
};
