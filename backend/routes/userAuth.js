const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {accessSecret,refreshSecret} = require("../key")
const { generateAccessToken, generateRefreshToken } = require('../middlewares/auth'); 


router.post("/signup",(req,res)=>{
    const{fullName,lastName,email,address,password} = req.body;
    if(!fullName || !lastName || !email || !address || !password){
     return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email}).then((savedUser)=>{
      if(savedUser){
          return res.status(422).json({error:"User already exist"})
      }
      bcrypt.hash(password, 12).then((hashedPassword)=>{
      const user = new User({
          fullName,
          lastName,
          email,
          address,
          password:hashedPassword,
          
        })
        user.save()
        .then(user=>{res.json({message:"saved successfully"})})
        .catch(err=>console.log(err))
      })
  }) 
  })

  router.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" });
      }
  
      const savedUser = await User.findOne({ email: email });
  
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email" });
      }
      const result = await bcrypt.compare(password, savedUser.password);
  
      if (result) {
        const accessTokenExpiration = '4s' 
        const refreshTokenExpiration = '20s' 
        
        const accessToken = generateAccessToken(savedUser, accessTokenExpiration);
        const refreshToken = generateRefreshToken(savedUser, refreshTokenExpiration);
        console.log("eh",accessToken)
        const { _id, fullName, lastName, address, email } = savedUser;
        res.json({ accessToken, refreshToken,accessTokenExpiration,refreshTokenExpiration, user: { _id, fullName, lastName, address, email } });
       
      } else {
        return res.status(422).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  });

  router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is missing' });
    }
  
    try {
      const payload = jwt.verify(refreshToken, refreshSecret);
  
      const userData = await User.findById(payload._id);
  
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      
      const expirationTime = '4s'; // 15 minutes
  

      const newAccessToken = jwt.sign({ _id: userData._id }, accessSecret, { expiresIn: expirationTime });
  
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
  });
  



  module.exports = router