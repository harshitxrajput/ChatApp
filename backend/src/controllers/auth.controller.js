import bcrypt from 'bcryptjs';

import { generateToken } from '../lib/utils.js';
import userModel from '../models/user.model.js';
import cloudinary from '../lib/cloudinary.js';

export const signupController = async (req, res) => {
    const { fullName, email, password } = req.body;
    
    try{
        if(!fullName || !email || !password) return res.status(400).json({ error: "All fields required" });
        if(password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters long" });

        const user = await userModel.findOne({ email });
        if(user) return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            email,
            fullName,
            password: hashedPassword
        });

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                password: newUser.password,
                profilePic: newUser.profilePic
            });
        }
        else{
            res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch(error){
        console.log(`Error in signupController ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword){
            return res.status(400).json({ error: "Incorrect password" });
        }
        
        generateToken(user._id, res);
        res.status(200).json({
            message: "User login successfully",
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    }
    catch(error){
        console.log(`error in loginController: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logoutController = async (req, res) => {
    try{
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch(error){
        console.log(`Error in logoutController ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateProfileController = async (req, res) => {
    try{
        const { profilePic } = req.body;
        const userId = req.user._id;

        if(!profilePic) return res.status(400).json({ error: "Profile Pic required" });

        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            profilePic: uploadedResponse.secure_url
        }, { new: true });

        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    }
    catch(error){
        console.log(`Error in updateProfileController: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getProfileController = async (req, res) => {
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log(`Error in checkAuthController: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}