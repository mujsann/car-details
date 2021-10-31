// Ambient typing. Ie. Global *.d.ts files can let you use types without aneed forimport statements
// You can store interfaces directly on the main file that use them.
// Like any other class, function or object, you can explicitly export and import
// types from .ts files. Maybe these are TS files that contain nothing but types. 
// These can be kept in the root folder or locally in the specific directory. 

// External Modules
import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
const logger = require("morgan")

// Environmental variables
dotenv.config()
if (!process.env.PORT) {
    process.exit(1)
}


//routes
import { router } from "./routes";

//start server
export default function startServer() {

    const port: number = parseInt(process.env.PORT as string, 10)
    const app: Application = express()

    app.use(logger("dev"));
    app.use(cors());
    app.use(express.json());
    app.set("trust proxy", 1);
    app.use("/", router)

    //start server
    app.listen(port, () => console.log(`Server is running on port ${port}`));


    return app
}

// startServer()





