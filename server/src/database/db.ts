import mongoose from 'mongoose';
import {MONGO_URL} from '../config/index'


export async function connectToDb(){
    try{
        if(typeof MONGO_URL === "undefined"){
            throw new Error("invalid connection string")
        }else{
            await mongoose.connect(MONGO_URL)
            console.log("db connected...")
        }
       
    }
    catch(err:any){
        console.log(err.message)
    }
}