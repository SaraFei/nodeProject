import express from "express";

import { getQtyOfSweets } from "../controllers/sweets.js";

const router=express.Router();
router.get("/",getQtyOfSweets);

export default router;