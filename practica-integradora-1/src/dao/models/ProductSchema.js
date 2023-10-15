import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: String,
    thumbnails: [String]
}, {
    timestamps: true
});

export default mongoose.model('Product', ProductSchema);
