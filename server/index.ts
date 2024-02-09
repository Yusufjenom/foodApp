import express from 'express';
import dotenv from 'dotenv';
import {connectToDb} from './database/db';
import { adminRoute, vendorRoute } from './routes';
import { ErrorHandler } from './middlewares/ErrorHandler';

dotenv.config();
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(adminRoute);
app.use(vendorRoute);

app.use(ErrorHandler);
(async function(){
    try{
      await connectToDb();
      app.listen(port, () => console.log(`server running on port ${port}`));
    }
    catch(err: any){
        console.log(err.message)
    }
})()
