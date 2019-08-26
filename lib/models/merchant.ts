import { Schema, Document, model } from 'mongoose';
import { IProduct } from './product';

export interface IMerchant extends Document {
    name: string;
    products: Array<IProduct['_id']>;
}

export const MerchantSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]

});

export default model<IMerchant>('Merchant', MerchantSchema);