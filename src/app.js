import express, { application, json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();


app.use(cors({
  origin:"https://sapiensf.onrender.com",
  credentials:true,
}))

app.use(cookieParser());
app.use(express.json())

app.use("/api",userRouter)


export { app };