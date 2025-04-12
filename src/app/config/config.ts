import path from 'path';
import dotenv from 'dotenv';
import process from 'process';

const envPath = path.join(process.cwd(), '.env.development');

dotenv.config({ path: envPath });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  access_token_secret_key: process.env.ACCESS_TOKEN_SECRET_KEY,
  refresh_token_secret_key: process.env.REFRESH_TOKEN_SECRET_KEY,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
