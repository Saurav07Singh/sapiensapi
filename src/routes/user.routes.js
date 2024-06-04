import { Router } from "express";
import {getColor, loginUser, logoutUser, pickColor, resgisterUser} from "../controllers/user.controller.js";

const userRouter= Router();

userRouter.route("/register").post(resgisterUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/color").put(pickColor)
userRouter.route("/color").get(getColor)
userRouter.route("/logout").get(logoutUser)


export default userRouter