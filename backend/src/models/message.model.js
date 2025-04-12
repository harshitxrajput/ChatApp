import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    text: {
        type: String
    },

    image: {
        type: String
    }
}, { timestamps: true });

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;