import mongoose from "mongoose";
const {Schema} = mongoose;

const sizeModifiersSchema = new Schema({
    size: {type: String, required: true, unique: true},
    modifier: {type: Number, required: true, default: 0},
});

export default mongoose.model('SizeModifier', sizeModifiersSchema);