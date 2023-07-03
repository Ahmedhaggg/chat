import dotenv from "dotenv"
import path from "path";
dotenv.config();

interface IEnvironmentVariables {
    PORT: number;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    BCRYPT_SALT: string;
    JWT_SECRET: string;
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
}

const {
    PORT = 4000,
    CLIENT_ID,
    CLIENT_SECRET,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    BCRYPT_SALT,
    JWT_SECRET,
    CLOUD_NAME,
    API_KEY,
    API_SECRET
}: IEnvironmentVariables = process.env as unknown as IEnvironmentVariables;

const BCRYPT_SALT_INT = parseInt(BCRYPT_SALT)
const UPLOADS_DEST = path.join(path.dirname(path.dirname(__dirname)), "test");

export {
    PORT,
    CLIENT_ID,
    CLIENT_SECRET,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    BCRYPT_SALT_INT,
    JWT_SECRET,
    UPLOADS_DEST,
    CLOUD_NAME,
    API_KEY,
    API_SECRET
}