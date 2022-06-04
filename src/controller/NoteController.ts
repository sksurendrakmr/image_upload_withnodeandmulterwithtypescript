import { Request, Response } from "express";
import { NoteDto } from "../dto/NoteDto";
import { CustomReq } from "../dto/UserDto";
import { Note } from "../models/Notes";
import { User } from "../models/User";

export const getNotes = async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const saveNote = async (req: CustomReq<NoteDto>, res: Response) => {
  //   console.log(req.file);
  const savedNote = await Note.create(req.body);
  res.status(201).json(savedNote);
  // if(req.files) req.body.images = req.files
};
