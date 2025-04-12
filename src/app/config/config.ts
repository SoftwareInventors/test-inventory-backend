import path from 'path';
import dotenv from 'dotenv';
import process from 'process';

const envPath = path.join(process.cwd(), '.env.development');

dotenv.config({ path: envPath });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
