import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const dbContext = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "ambassador",
    synchronize: false,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/database/migrations/**/*.ts"],
    migrationsTableName: "migrations"
});