import { Schema, Document, model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
}

export const ProductSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    price: {
        type: Number
    }
});

export default model<IProduct>('Product', ProductSchema);