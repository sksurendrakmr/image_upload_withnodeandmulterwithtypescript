import { Router } from "express";
import { getUser, saveUser } from "../controller/UserController";

const router = Router();

router.route("/").get(getUser).post(saveUser);

export default router;
