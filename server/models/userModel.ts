import mongoose, {Schema, Document, model} from "mongoose";
import { NumericLiteral } from "typescript";

interface UserDocumennt extends Document{
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    address: string;
    phone: string;
    verified: boolean;
    otp: number;
    otp_expiry: Date,
    lat: number;
    lon: number;
};

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        //required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        required: true
    },
    // coverImages:{
    //     type: [String],
    //     //required: true
    // },
    otp:{
        type: Number,
        required: true
    },
    otp_expiry:{
        type: Number,
        required: true
    }
    ,
    lon:{
        type: Number,
        //required: true
    }
    ,
    lat:{
        type: Number,
        //required: true
    }
    ,
}, {timestamps: true, toJSON:{
    transform(doc, ret){
        delete ret.password
    }
}})


export const UserModel = mongoose.model<UserDocumennt>('user', userSchema);