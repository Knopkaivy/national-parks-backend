import mongoose from "mongoose";
const {Schema} = mongoose;

const pricingSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    basePrice: {type: Number, required: true}
}, {timestamps: true});

export default mongoose.model('Pricing', pricingSchema);