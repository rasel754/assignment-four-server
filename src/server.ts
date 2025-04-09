import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;
//connect to mongodb
async function connect() {
  try {
    await mongoose.connect(config.database_url as string, {
      serverSelectionTimeoutMS: 60000,
    });
    server = app.listen(config.port, () => {
      console.log(`server lisening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
connect();
process.on('unhandledRejection', (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
