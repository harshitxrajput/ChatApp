const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.createUserController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await userService.createUser(req.body);

        const token = user.generateJWT();
        
        res.status(201).json({user, token});
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

module.exports.loginUserController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).send({ errors: errors.array() });
    }

    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');
        if(!user){
            return res.status(404).json({ errors: "Invalid Credentials"})
        }

        const isMatch = await user.isValidPassword(password)
        if(!isMatch){
            return res.status(401).json({ errors: "Invalid Credentials" });
        }

        const token = await user.generateJWT();

        res.status(200).json({ user, token });
    }
    catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
}