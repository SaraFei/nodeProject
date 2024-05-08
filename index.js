import express from "express";
import cors from "cors"//מה הקטע שלו?
import { config } from "dotenv";

import sweetsRouter from "./routs/sweets.js"
import userRouter from "./routs/user.js"
import orderRouter from "./routs/order.js"
import OtysweetsRouter from "./routs/sweetsQty.js"
import { connectToDB } from "./config/DBConfig.js";//למה מפרידים אותו
import{errorHandling}  from "./middleware/errorHandling.js";


config();
connectToDB();
const app=express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/sweets",sweetsRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);
app.use("/api/sweetsQty",OtysweetsRouter);

errorHandling();
let port=process.env.PORT||3500;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
