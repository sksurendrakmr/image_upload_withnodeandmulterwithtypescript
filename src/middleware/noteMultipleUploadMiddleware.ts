import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import sharp from "sharp";
import { NoteDto } from "../dto/NoteDto";
import { CustomReq } from "../dto/UserDto";

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//For mix of single and multiple upload
export const uploadNotesImages = upload.fields([
  {
    name: "noteImgCover",
    maxCount: 1, //we can only have one img for noteImgCover
  },
  {
    name: "noteImages",
    maxCount: 2,
  },
]);

//If we only need to upload multiple images
// upload.array('noteImages',5)

//only single image
// upload.none('fieldName')

export const resizeNoteImgs = async (
  req: CustomReq<NoteDto>,
  res: Response,
  next: NextFunction
) => {
  const typedReqFields = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  if (!typedReqFields.noteImages || !typedReqFields.noteImgCover) return next();

  //1. Cover Img
  const noteCoverImg = typedReqFields.noteImgCover[0];

  const noteCoverImgFilename = `note_${
    req.body.title.split(" ")[0]
  }_${Date.now()}.jpeg`;

  await sharp(noteCoverImg.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/imgs/notes/${noteCoverImgFilename}`);

  //append in req body so we can persist the filename in database
  req.body.noteImgCover = noteCoverImgFilename;

  //2 noteImgs

  req.body.noteImages = [];
  const noteImgsPromise = typedReqFields.noteImages.map(async (file, index) => {
    const fileName = `Note_${req.body.title}_${index + 1}.jpeg`;

    await sharp(typedReqFields.noteImages[index].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/imgs/notes/${fileName}`);

    req.body.noteImages?.push(fileName);
  });

  await Promise.all(noteImgsPromise);
  next();
};
