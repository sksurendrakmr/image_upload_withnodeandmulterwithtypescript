import { Router } from "express";
import { getUser, saveUser } from "../controller/UserController";
import { uploadUserImage } from "../middleware/userUploadMiddleware";

const router = Router();

router.route("/").get(getUser).post(uploadUserImage, saveUser);

export default router;
