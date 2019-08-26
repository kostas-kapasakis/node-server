import { Schema, Document, model } from 'mongoose';

export interface IShopper extends Document {
    accountNumber: string;
    balance: number;
    dateAdded: Date;
}

export const ShopperSchema: Schema = new Schema({
    accountNumber: {
        type: String,
        required: 'Enter the account number'
    },
    balance: {
        number: Number
    },
    dateAdded: {
        type: Date,
        // default: Date.now
    }
});

export default model<IShopper>('Shopper', ShopperSchema);