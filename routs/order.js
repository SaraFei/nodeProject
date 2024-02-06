import express from "express";
import * as orderControllers from "../controllers/order.js";
import { authAdmin, authUser } from "../middleware/auth.js";

const router = express.Router();
router.get("/", authAdmin, orderControllers.getAllOrders);
router.post("/", authUser, orderControllers.addOrder);
router.delete("/:id", authUser, orderControllers.deleteOrder);
router.put("/:id", authAdmin, orderControllers.isShipped);
router.get("/getOrderById", authUser, orderControllers.getOrderById);
export default router;