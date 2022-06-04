import { Request, Response } from "express";
import { User } from "../models/User";

export const getUser = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const saveUser = async (req: Request, res: Response) => {};
