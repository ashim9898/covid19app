const express = require("express")
const app = express()
const PORT = 5000;
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
require("./models/user")
require("./models/familyGroup")


app.use(express.json())
app.use(require("./routes/userAuth"));
app.use(require("./routes/familyApi"));
app.use(require("./routes/profile"));

mongoose.connect("mongodb+srv://ashimcsit17:ashimbarca100@cluster0.k0wu9w0.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.on("connected",()=>{
    console.log("Successfully connected to mongodb")
})
mongoose.connection.on("error",()=>{
    console.log("Not connected to mongodb")
})




app.listen(PORT,()=>{
    console.log("server is running on " + PORT)
})


