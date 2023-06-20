
import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    balance: {
        type: Number,
        default: 0
    }
});

CustomerSchema.plugin(timestamp);

export const Customer = mongoose.model('customer', CustomerSchema);