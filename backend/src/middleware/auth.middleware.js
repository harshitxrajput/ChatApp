import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

export const isLoggedIn = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({ error: "Unauthorized User" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({ error: "Unauthorized User" });

        const user = await userModel.findById(decoded.userId).select("-password");
        if(!user) return res.status(404).json({ error: "User not found" });

        req.user = user;
        next();
    }
    catch(error){
        console.log(`Error in isLoggedIn middleware: ${error.message}`);
        res.status(401).json({ error: "Unauthorized User" });
    }
}