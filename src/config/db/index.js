import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected,${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(error, "connection failed")
    }
}

export { connectDB }