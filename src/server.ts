import app from './app';
import config from './app/config/config';
import mongoose from 'mongoose';
import * as process from 'process';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('✅ Database connected successfully');
    app.listen(config.port, async () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (error) {
    console.log('❌ Failed to connect to database');
    if (error instanceof Error) {
      console.log(error.message);
    }
    process.exit(1);
  }
}

main();
