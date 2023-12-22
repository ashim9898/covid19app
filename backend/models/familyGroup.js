const mongoose = require('mongoose');
const user = require('./user');
const {ObjectId} = mongoose.Schema.Types;


const familySchema = new mongoose.Schema({
   groupName:{type: String},
   email: {type: String},
   members:[ 
         {
         fullName: { type: String, required: true },
         address: { type: String, required: true },
         phone: { type: Number },
         gender: { type: String },
         dob: { type: Date},
         covidStatus:{type: String, required: true},
         vaccineStatus:{type: String, required: true},
         quarantine:{type: String, required: true},
         infectedDays:{type: Date, required: true},

      }
   ]


})

const family = mongoose.model("family", familySchema)

module.exports = family
