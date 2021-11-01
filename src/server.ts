//external modules
import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
const logger = require("morgan")

//dotenv
dotenv.config()
if (!process.env.PORT) {
    process.exit(1)
}


//routes
import { router } from "./routes";

//start server
export default function startServer() {

    const port: number = parseInt(process.env.PORT as string, 10) || 5000
    const app: Application = express()

    app.use(logger("dev"));
    app.use(cors());
    app.use(express.json());
    app.set("trust proxy", 1);
    app.use("/", router)

    //listen on port
    app.listen(port, () => console.log(`Server is running on port ${port}`));


    return app
}







