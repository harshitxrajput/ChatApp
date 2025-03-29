const jwt = require('jsonwebtoken');
const redisClient = require('../services/redis.service');

module.exports.authUser = async (req, res, next) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token){
            res.status(401).send({ error: "Unauthorized User" });
        }

        const isBlacklisted = await redisClient.get(token);
        if(isBlacklisted){
            res.cookie('token', '');
            res.status(401).send({ error: "Unauthorized User" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({ error: "Not Authorized" });
    }
}