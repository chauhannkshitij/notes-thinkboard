import mongoose from "mongoose"

export const connectDB  = async () => {
    try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongodb connected")
    } catch (error) {
        console.error("error connection to db")
        process.exit(1) 
    }
}