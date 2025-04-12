import cloudinary from "../lib/cloudinary.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";

export const sidebarUserController = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await userModel.find({ _id: {$ne: loggedInUserId} }).select("-password");

        res.status(200).json({ filteredUsers });
    }
    catch(error){
        console.log(`Error in sidebarUserController: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMessagesController = async (req, res) => {
    try{
        const { id:userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await messageModel.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        });

        res.status(200).json(messages);
    }
    catch(error){
        console.log(`Error in getMessagesController: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendMessageController = async (req, res) => {
    try{
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        }

        const newMessage = messageModel.create({
            senderId,
            recieverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    }
    catch(error){
        console.log(`Error in sendMessageController: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}