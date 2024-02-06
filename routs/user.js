import express from "express";
import * as userController from "../controllers/user.js"
import { authAdmin } from "../middleware/auth.js";

const router = express.Router();
router.post("/", userController.addUser);
router.post("/login", userController.userLogin);
router.get("/",authAdmin, userController.getAllUsers);

export default router;