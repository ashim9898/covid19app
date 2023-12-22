const mongoose = require('mongoose');
const user = require('./user');
const family = require('./familyGroup');
const {ObjectId} = mongoose.Schema.Types

const inviteSchema = new mongoose.Schema({
    email:{type: String},
    familyId: {type:ObjectId, ref:family},
    owner:{type:Boolean}

})

const invite = mongoose.model("invite", inviteSchema)

module.exports = invite
