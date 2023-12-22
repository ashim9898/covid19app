const jwt = require('jsonwebtoken');
const { accessSecret } = require('../key');
const { refreshSecret } = require('../key');

// Function to generate access token
function generateAccessToken(user, expiresIn) {
    const payload = {
        _id: user._id,
    };

    return jwt.sign(payload, accessSecret, { expiresIn });
}

// Function to generate refresh token 
function generateRefreshToken(user, expiresIn) {
    const payload = {
        _id: user._id,
    };

    return jwt.sign(payload, refreshSecret, { expiresIn });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
