import mongoose, {Schema, model, Document} from "mongoose";

export interface FoodDoc extends Document{
    vendorId: string,
    name: string,
    description: string,
    category: string,
    foodType: string,
    readyTime: number,
    price: number,
    images: [string],
    rating: number

}

const foodSchema = new Schema({
    vendorId: {
        type: String,
        //required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        //required: true
    },
    foodType: {
        type: String,
        required: true
    },
    readyTime: {
        type: Number,
       // required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        //required: true
    },
    rating:{
        type: Number,
        //required: true
    },
}, {
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.createdAt,
            delete ret.updatedAt
        }
    }
});


export const FoodModel = mongoose.model<FoodDoc>('food', foodSchema);

