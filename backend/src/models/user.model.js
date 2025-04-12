import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        requried: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

export default userModel;