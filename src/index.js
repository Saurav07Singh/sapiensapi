import dotenv from "dotenv"
import { app } from "./app.js"
dotenv.config({path:'./env'})
import dbConnect from "./db/dbConnect.js"

import userRouter from "./routes/user.routes.js"



app.use("/api",userRouter)

dbConnect()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running at PORT ${process.env.PORT}`)
    })
})
.catch(err=>console.log("Error in connecting database!",err))