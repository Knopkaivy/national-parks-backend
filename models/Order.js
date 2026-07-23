import mongoose from "mongoose";

const {Schema} = mongoose;

const orderItemSchema = new Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    productName: {type: String, required: true},
    slug: {type: String, required: true},
    size: {type: String, required: true},
    finish: {type: String, required: true},
    pricePaid: {type: Number, required: true},
    quantity: {type: Number, required: true, default: 1},
})

const ordersSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items: {type: [orderItemSchema], required: true},
    totalPrice: {type: Number, required: true},
    shippingCost: {type: Number, required: true},
    totalWithShipping: {type: Number, required: true},
    shippingAddress: {
        firstName: String,
        lastName: String,
        addressLineOne:  String,
        addressLineTwo: String,
        city: String,
        state: String,
        zip: String,
    },
    status: {type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending'},

}, {timestamps: true});

export default mongoose.model('Order', ordersSchema);