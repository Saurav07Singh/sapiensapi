import mongoose from "mongoose"

const dbConnect = async ()=>{
    try {
      const connectionInstance= await mongoose.connect(`${process.env.DATABASE_URI}/users`)
      console.log("DATABASE CONNECTED!")
    } catch (error) {
        console.error("Mongo DB Connection ERROR!",error)
        process.exit(1)
    }
}

export default dbConnect