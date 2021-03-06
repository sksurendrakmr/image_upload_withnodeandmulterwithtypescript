import { Router } from "express";
import { getUser, saveUser } from "../controller/UserController";
import {
  resizeUserPhoto,
  uploadUserImage,
} from "../middleware/userUploadMiddleware";

const router = Router();

router.route("/").get(getUser).post(uploadUserImage, resizeUserPhoto, saveUser);

export default router;
