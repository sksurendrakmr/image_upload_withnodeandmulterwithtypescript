import { Request } from "express";
import multer from "multer";

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
const upload = multer({ dest: "public/imgs/users" });
// router.route("/").get(getUser).post(upload.single("image"),saveUser);
