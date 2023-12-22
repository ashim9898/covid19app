const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Profile = require("../models/userProfile");
const User = require("../models/user");
const requireLogin = require("../middlewares/requireLogin");

router.post("/profile",async(req,res)=>{
 
    const {firstName, lastName,address, phone,gender,dob,email} = req.body
    try{
        const existingProfile = await Profile.findOne({email})
        if(existingProfile){
         
          return res.send({error:"profile already exists"});
        }
        const newUserProfile = new Profile({firstName, lastName,address, phone,gender,dob,email});

       await newUserProfile.save()
        if(newUserProfile){
            res.json(newUserProfile)
        }
    }catch(err){
        console.log(err)
    }
})

//

// Get profile route
router.get("/get-details/:id",requireLogin,async(req,res)=>{
  const{id} = req.params;
  try {
    const userDetail = await User.findOne({_id:id});

    if (!userDetail) {
      
      return res.json({ error: "Profile not found" });
    }
    res.json({ userDetail });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
})
  

   

router.put("/edit-profile/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
   
    try {
      const updatedProfile = await User.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
  
      if (!updatedProfile) {
        // const newProfile = await Profile.create(updatedData)
        return res.json({ message: "Profile not found" });
      }
  
      res.json({ profile: updatedProfile });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
module.exports = router