import { generateToken } from '../lib/utils.js';
import userModel from '../models/user.model.js';

import bcrypt from 'bcryptjs';

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
    try{
        
    }
    catch(error){
        console.log(`error in loginController: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logoutController = async (req, res) => {

}