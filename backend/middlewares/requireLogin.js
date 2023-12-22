const { generateAccessToken, generateRefreshToken } = require('./auth'); 
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("User");
const {accessSecret} = require('../key'); 

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You need to login" });
    }

    const token = authorization.replace("Bearer ", "");
    try {
        const payload = jwt.verify(token, accessSecret);
        const { _id } = payload;

        const userData = await User.findById(_id);
        req.user = userData;

      

        next();
    } catch (err) {
        return res.status(401).json({ error: "You need to login" });
    }
};
