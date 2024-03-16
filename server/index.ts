import express from 'express';
import App from './services/expressApp';
import dotenv from 'dotenv';
import {connectToDb} from './database/db';


dotenv.config();
const port = 8080;

const startServer = async () => {
  const app = express();
  await connectToDb();
  await App(app);
  app.listen(port, () => console.log(`server running on port ${port}`));
};

startServer();

