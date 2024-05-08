import express from "express";
import * as sweetsControllers from "../controllers/sweets.js"
import { authAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", sweetsControllers.getAllSweets);
router.get("/:sweetCode", sweetsControllers.getSweetById);
// router.put("/:sweetCode", authAdmin,sweetsControllers.updateSweet);
router.put("/:id",sweetsControllers.updateSweet);

router.post("/",authAdmin, sweetsControllers.addSweet);
router.delete("/:id",authAdmin, sweetsControllers.deleteSweet);

export default router;