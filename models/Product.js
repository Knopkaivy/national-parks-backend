import mongoose from 'mongoose';
const { Schema } = mongoose;

const imageSchema = new Schema({
    url: String,
    alt: String
})

const productSchema = new Schema({
    slug: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    park: {type: String, required: true},
    style: {type: String, required: true},
    rating: Number,
    reviewCount: Number,
    tags: [String],
    inStock: Boolean,
    featured: Boolean,
    newArrival: Boolean,
    description: String,
    details: [String],
    images: {type: [imageSchema], required: true},
    availableSizes: [String],
    availableFinishes: [String],
}, { timestamps: true })

export default mongoose.model('Product', productSchema)