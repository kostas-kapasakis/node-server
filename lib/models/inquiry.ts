import { Schema, Document, model } from 'mongoose';
import { InquiryStatusEnum } from 'enums/inquiry-status.enum';
import { IMerchant } from './merchant';
import { IShopper } from './shopper';


export interface IInquiry extends Document {
    cardNumber: string;
    cvv: number;
    amount: number;
    currency: string;
    monthDayExpiration: Date;
    status: InquiryStatusEnum;
    merchant: IMerchant['_id'];
    shopper: IShopper['id'];
}


export const InquirySchema = new Schema({
    cardNumber: {
        type: String,
        required: 'Card number is required'
    },
    cvv: {
        type: Number,
        required: 'cvv number is required'
    },
    amount: {
        type: Number,
        required: 'Amount is required'
    },
    currency: {
        type: String,
        required: 'currency is required'
    },
    monthDayExpiration: {
        type: Date,
        required: 'Card expiration date is required'
    },
    status: {
        type: Number
    },
    merchant:{ type: Schema.Types.ObjectId, required: true },
    shopper: { type: Schema.Types.ObjectId, required: true }

});

export default model<IInquiry>('Inquiry', InquirySchema);