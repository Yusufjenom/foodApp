import mongoose, {Schema, model, Document} from "mongoose";
import { IAdminInput } from "../dto/admin.dto";


const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    pin:{
        type: Number,
    },
    address:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    }
}, {timestamps: true, toJSON:{
    transform(doc, ret){
        delete ret.password
    }
}});

export const AdminModel = mongoose.model<IAdminInput>('admin', adminSchema);