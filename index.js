import express from "express";
import { config } from "dotenv";
import sweetsRouter from "./routs/sweets.js"
import userRouter from "./routs/user.js"
import orderRouter from "./routs/order.js"
import { connectToDB } from "./config/DBConfig.js";
import{errorHandling}  from "./middleware/errorHandling.js"
config();
connectToDB();
const app=express();
app.use(express.json());
app.use("/api/sweets",sweetsRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);

errorHandling();
let port=process.env.PORT||3500;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
