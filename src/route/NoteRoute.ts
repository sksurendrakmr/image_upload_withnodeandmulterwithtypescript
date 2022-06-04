import { Router } from "express";
import { getNotes, saveNote } from "../controller/NoteController";
import {
  resizeNoteImgs,
  uploadNotesImages,
} from "../middleware/noteMultipleUploadMiddleware";

const router = Router();

router
  .route("/")
  .get(getNotes)
  .post(uploadNotesImages, resizeNoteImgs, saveNote);

export default router;
