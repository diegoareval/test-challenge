import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
    PORT: process.env.PORT || 3001
}