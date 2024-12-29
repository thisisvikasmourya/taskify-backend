import { app } from "./app.js";
import { connectDB } from "./config/db/index.js";
import { configDotenv } from "dotenv";

configDotenv()

connectDB()
app.listen(process.env.PORT, () => {
    console.log(`listening on : ${process.env.PORT}`);
});