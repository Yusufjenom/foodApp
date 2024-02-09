import mongoose, {Schema, Document, model} from "mongoose";

interface VendorDocumennt extends Document{
    name: string;
    ownerName: string;
    foodType:[string];
    pincode:string;
    address:string;
    phone:string;
    email:string;
    password:string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
    //foods: any
};

const vendorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    ownerName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        //required: true
    },
    pincode:{
        type: String,
        required: true
    },
    foodType:{
        type: [String],
        //required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    serviceAvailable:{
        type: Boolean,
        //required: true
    },
    coverImages:{
        type: [String],
        //required: true
    },
    rating:{
        type: Number,
        //required: true
    },
    // foods:{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'food'
    // },
}, {timestamps: true, toJSON:{
    transform(doc, ret){
        delete ret.password
    }
}})


export const VendorModel = mongoose.model<VendorDocumennt>('vendor', vendorSchema);