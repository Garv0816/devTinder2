const express = require('express')
const connectDB = require("./config/database")
const User = require("./models/users")
const app = express()

app.post("/signup" , async(req ,res)=>{
    const user = new User({
        firstName : "Gunjan",
        lastName : "Kumari",
        email : "gunjan@gmail.com",
        password : "123"
    })
try{
 await user.save()
    res.send("User Added Successfully")
}
catch(err){
    res.status(400).send("Error occured" + err.message)
}
   
}
)

// connecting to our DATA BASE OF MongoDB
connectDB().then(
    ()=>{
        console.log("Connection request established Successfully...")
        app.listen(2222, ()=>{console.log("server running successfully")})
    }
).catch(err => {
    console.log("cannot make connection cause "+err.message)
})
