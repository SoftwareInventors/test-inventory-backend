import app from './app';
import config from './app/config/config';
import mongoose from 'mongoose';

async function main() {
  try {
    // console.log("Database URL:", config.database_url);
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, async () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
