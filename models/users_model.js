import mongoose from "mongoose";

const UserSchema = new mongoose.Schema( {
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

export const User = mongoose.model('user', UserSchema);