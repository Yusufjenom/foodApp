import express from 'express';
import App from './services/expressApp';
import dotenv from 'dotenv';
import {connectToDb} from './database/db';
import {PORT} from '../src/config/index';


dotenv.config();
const port = 8080;

const startServer = async () => {
  const app = express();
  await connectToDb();
  await App(app);
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
};

startServer();

