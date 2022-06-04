import { NextFunction, Request, Response } from "express";
import sharp from "sharp";

import multer, { FileFilterCallback } from "multer";
import { CustomReq, UserDto } from "../dto/UserDto";

/**
 * multer is a middleware to handle multi-part data which is a form encoding
 * that's used to upload from a form.
 */

/**
 * M1
 * If we don't pass any arguments in multer, it will store the image in memory.
 *
 * If we pass an argument(obj with dest property) then our file will be uploaded
 * into a directory in our file system.
 *
 * Images are not directly uploaded to the database, we upload it into file system
 * and then in the database, we put a link to that image.
 *
 * Here, we use 'upload variable' to create a middleware function and put
 * this in the route path.
 *
 * upload.single('fieldName in which we want to store the image')
 * ============
 * Its a middleware that will take the image from form.
 * This middleware also put some info in the req obj.
 *
 */
// const upload = multer({ dest: "public/imgs/users" });
// export const uploadUserPhoto = upload.single('image')
// router.route("/").get(getUser).post(uploadUserPhoto,saveUser);

/**
 * we could also store the file in memory as a buffer so that we can
 * use that later by other processes.
 */
// const multerStorage = multer.diskStorage({
//   //req -> current request
//   //file -> currently uploaded file
//   //cb -> cb function (a bit like next Fn in express)
//   destination: (req, file, cb) => {
//     cb(null, "public/imgs/users");
//   },
//   filename: (req: CustomReq<UserDto>, file, callback) => {
//     const ext = file.mimetype.split("/")[1];
//     callback(null, `user-${req.body.name}-${Date.now()}.${ext}`);
//   },
// });

/**
 * This way the image will be saved as buffer
 */
const multerStorage = multer.memoryStorage();

/**
 * The goal of this function is to test if the uploaded file is
 * an image. If it is, pass true in cb() else false.
 */
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

export const uploadUserImage = upload.single("image");

/**
 * Sharp is very popular and easy to use library for image processing in nodejs.
 *
 * Usually, when we do image processing right after uploading a file then it's always
 * best to not even save the file to the disk but instead save it to memory.
 *
 */
export const resizeUserPhoto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next();
  //instead of write the file to disk and here read it again, we simply keep the image in memory.
  //calling this sharp() with buffer file create an object where we can chain multiple methods in order to do
  //our image processing.
  //After image processing, we will write the file to the disk.
  //toFile needs entire path along with filename to write the file in disk.

  //Determining file name and assign in to req.file.filename
  //why? Because we rely on req.file.filename to save the image ref to database
  //as by default req.file.filename is not defined but we need that req.file.filename
  //in other middleware function.
  req.file.filename = `user-${req.body.name}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/imgs/users/${req.file.filename}`);

  next();
};
