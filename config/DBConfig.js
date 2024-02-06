import mongoose, { connect } from "mongoose";
export const connectToDB=async()=>{
try{
   let connect=await mongoose.connect(process.env.DB_CONNECTION);
    console.log("success",connect.connection.host);
}
catch(err){
    console.log("cannot connect to mongoose");
    console.log(err);
    process.exit(1);
}
}