import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    isAdmin: {type: Boolean, default: false},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    shippingAddress: {
        addressLineOne:  String,
        addressLineTwo: String,
        city: String,
        state: String,
        zip: String,
    },
}, {timestamps: true});

export default mongoose.model('User', userSchema);