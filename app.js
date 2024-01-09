import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

//calling config file
config({
    path:"./data/config.env",

});

//middlewares

//using middleware to access data from postman in json form
app.use(express.json());

app.use(cookieParser());

app.use(
    cors({
        origin:[process.env.FRONTEND_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }))

//by default har get request mae /users lg jaega 
app.use("/api/v1/users",userRouter);

app.use("/api/v1/task",taskRouter);

app.get("/", (req, res) => {
    res.send("Nice working");
  });



//inko uta kr server.js mae paste kr rhe 👇
// //database
// connectdb(); 






// app.listen(4000,()=>{
//     console.log("Server is working");
// })