const mongoose = require('mongoose');
const user = require('./user');
const family = require('./familyGroup');
const {ObjectId} = mongoose.Schema.Types

const relationshipSchema = new mongoose.Schema({
    sender:{type: String},
    receiver: {type:String},
    // owner:{type:Boolean}

})

const relation = mongoose.model("relation", relationshipSchema);

module.exports = relation
