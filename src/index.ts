import express from "express";
import cors from "cors";
import  { DataSource } from "typeorm";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "ambassador",
    synchronize: false,
    logging: false,
    entities: ["src/entities/*.ts"],
});

connectDb.initialize().then(() => {
    const app = express();
    
    app.use(cookieParser());
    app.use(express.json());
    app.use(cors({
        origin: ["http://localhost:3000"]
    }));

    routes(app);
    
    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });

}).catch((err) =>  {
    console.log(`Database connection failed: ${err}`);
});
