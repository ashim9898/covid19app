const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Family = mongoose.model("family");
const relation = require("../models/relationship");
const Invite = require("../models/invite");
const nodemailer = require("nodemailer");
    const requireLogin = require("../middlewares/requireLogin");
console.log("require", requireLogin)
//Create family
router.post("/families/create", requireLogin ,async (req, res) => {
  
  const { groupName, email, members } = req.body;
 
  try {
    const newFamily = new Family({ groupName, email, members });
    const savedFamily = await newFamily.save();
    
    res.status(201).json(savedFamily);
      const newinvite = new Invite({
        email: email,
        familyId: savedFamily._id,
        owner: true,
      });
      newinvite.save();
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }

  
 
});

//Get families detail for update
router.get("/families1/:id", requireLogin,async (req, res) => {
  
  const { id } = req.params;
 
  try {
    const familyDetail = await Family.findById({ _id: id });
    
    res.json({ allfamily1: familyDetail });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

//retrieve the list of user's family group
router.get("/families/:email", requireLogin ,async (req, res) => {
  
  const { email } = req.params;

  try {
    const familyListofuser = await Family.find({ email: email });
    const allinvitedemail = await relation
      .find({ sender: email })
      .select("receiver")
      .exec();
    const allinvitetomeemail = await relation
      .find({ receiver: email })
      .select("sender")
      .exec();
    
    const allFamilyDetails = [];
    for (let i = 0; i < allinvitedemail.length; i++) {
      const familyDetail = await Family.find({
        email: allinvitedemail[i].receiver,
      });
      // allFamilyDetails.push(familyDetail);
      for (let j = 0; j < familyDetail.length; j++) {
        allFamilyDetails.push(familyDetail[j]);
      }
    }
    for (let i = 0; i < allinvitetomeemail.length; i++) {
      const familyDetail = await Family.find({
        email: allinvitetomeemail[i].sender,
      });
      
      for (let j = 0; j < familyDetail.length; j++) {
        allFamilyDetails.push(familyDetail[j]);
      }
    }
    
    for (let j = 0; j < familyListofuser.length; j++) {
      allFamilyDetails.push(familyListofuser[j]);
    }
    
    res.send({ allFamilyDetails });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

//Confirm email by accepting
router.get("/confirminvitation/:sender/:receiver", async (req, res) => {
  const { sender, receiver } = req.params;
  try {
    const relations = new relation({ sender: sender, receiver: receiver });
    relations.save();
  
    res.send("invition accepted successfully");
  } catch (error) {
    res.send("error");
  }
}); 

//Send mail using nodemailer
router.post("/send-mail", async (req, res) => {
  const { sender, receiver } = req.body;
 
 
  let mailtransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ashim1998.poudyal@gmail.com",
      pass: "arup ossg moue xxme",
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });
  const url = `http://localhost:5000/confirminvitation/${sender}/${receiver}`;
  let details = {
    from: "ashim1998.poudyal@gmail.com",
    to: `${receiver}`,
    subject: "testing our api",
    html: `<h1>hello<h1/><button>cancel<button/><button><a href="${url}">accept</a></button>`,
  };
  mailtransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mail is sent");
    }
  });
});

//delete the data
router.delete("/deleteRoute/:id", requireLogin,async (req, res) => {
  
  try {
    const inviteResult = await Family.deleteOne({ _id: req.params.id });
    res.status(201).json(inviteResult);
  } catch (err) {
    console.log(err);
  }
});

//Update Route
router.put("/families/update/:id", requireLogin ,async (req, res) => {

  const { id } = req.params;

  const { groupName, email, members } = req.body;
 
  try {
    const newFamily = await Family.findOneAndUpdate(
      { _id: id },
      { groupName, email, members },
      { new: true }
    );
    const updatedFamilyObject = newFamily.toObject();
    res.status(201).json(updatedFamilyObject);
  } catch (err) {
    console.log(err);
  }
});

//Count Date
router.get("/count-data/:email/:value", requireLogin ,async (req, res) => {
  
  try {
    const { email, value } = req.params;
    const findvalue = value / 12;
    const currdate = new Date();
    const currvalue =
      currdate.getFullYear() +
      currdate.getMonth() / 12 +
      currdate.getDate() / 30 / 12;

    const thirtyDaysAgo = new Date(currdate);
    thirtyDaysAgo.setDate(currdate.getDate() - 30);

    const allinvitedemail = await relation
      .find({ sender: email })
      .select("receiver")
      .exec();
    
      
    const allinvitetomeemail = await relation
      .find({ receiver: email })
      .select("sender")
      .exec();
    
    const allFamilyDetails = [];

    // Add family details based on allinvitedemail
    for (let i = 0; i < allinvitedemail.length; i++) {
      const familyDetail = await Family.find({
        email: allinvitedemail[i].receiver,
      });

      for (let j = 0; j < familyDetail.length; j++) {
        const { members } = familyDetail[j];
        for (let k = 0; k < members.length; k++) {
          const member = members[k];
          let year = member.infectedDays.getFullYear();
          let month = member.infectedDays.getMonth();
          let day = member.infectedDays.getDate();
          let value = year + month / 12 + day / 30 / 12;

          if (currvalue - value <= findvalue) {
          
            allFamilyDetails.push(familyDetail[j]);
            break; // Break to prevent adding the same family multiple times
          }
        }
      }
    }

    // Add family details based on allinvitetomeemail
    for (let i = 0; i < allinvitetomeemail.length; i++) {
      const familyDetail = await Family.find({
        email: allinvitetomeemail[i].sender,
        // "members.infectedDays": { $gte: thirtyDaysAgo, $lt: currdate },
      });
      
      for (let j = 0; j < familyDetail.length; j++) {
        const { members } = familyDetail[j];
        for (let k = 0; k < members.length; k++) {
          const member = members[k];
          let year = member.infectedDays.getFullYear();
          let month = member.infectedDays.getMonth();
          let day = member.infectedDays.getDate();
          let value = year + month / 12 + day / 30 / 12;

          if (currvalue - value <= findvalue) {
            
            allFamilyDetails.push(familyDetail[j]);
            break; // Break to prevent adding the same family multiple times
          }
        }
      }
    }

    // Add family details based on familyListofuser
    const familyListofuser = await Family.find({ email: email });
    for (let j = 0; j < familyListofuser.length; j++) {
      const { members } = familyListofuser[j];
      for (let k = 0; k < members.length; k++) {
        const member = members[k];
        let year = member.infectedDays.getFullYear();
        let month = member.infectedDays.getMonth();
        let day = member.infectedDays.getDate();
        let value = year + month / 12 + day / 30 / 12;

        if (currvalue - value <= findvalue) {
          allFamilyDetails.push(familyListofuser[j]);
          break; // Break to prevent adding the same family multiple times
        }
      }
    }

    res.send(allFamilyDetails);
  } catch (err) {
    console.log(err);
  }
});

//Group data
router.get("/getdatabydates/:email", requireLogin ,async (req, res) => {
  try{ 
   
    const{email}=req.params;
    
    const data=await Family.aggregate([
      {
        $match: {
          "email": email
        }
      },
      {
        $group: {
          _id:{   $year: {$arrayElemAt: ["$members.infectedDays", 0],}  },
          memberCount: { $sum: 1 }
        },
      },
      {
        $sort:{
          "_id":1,
        },
      },
    ]).exec();
   
    res.send(data)
  }catch(error){
   
    res.send("erorr");
  }
  });
  
  module.exports = router;
  