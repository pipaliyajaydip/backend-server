import dotenv from "dotenv";
import ms from "ms";
dotenv.config();

export const currentEnvType = process.env.NODE_ENV;
export const isProdEnv = currentEnvType === 'production';

const envFilePath = isProdEnv
    ? '.env.production'
    : '.env.development';

dotenv.config({
    path: envFilePath
});

export const PORT = process.env.PORT;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_EXPIRES_AT = ms(JWT_EXPIRES_IN);
export const REFRESH_SECRET = process.env.REFRESH_SECRET;
export const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN;
export const REFRESH_EXPIRE_AT = ms(REFRESH_EXPIRES_IN);

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
