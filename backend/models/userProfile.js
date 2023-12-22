const mongoose = require("mongoose")

const userProfileSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String },
    address: { type: String },
    phone: { type: Number },
    gender: { type: String },
    dob: { type: String },
    email: { type: String} ,
})

const userProfile = mongoose.model("userProfile", userProfileSchema)

module.exports = userProfile;