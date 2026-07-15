const express = require('express')
const connectDB = require("./config/database")
const User = require("./models/users")
const app = express()

app.use(express.json())
// sign up api 
app.post("/signup" , async(req ,res)=>{
    console.log(req.body)
    const user = new User(req.body)
try{
 await user.save()
    res.send("User Added Successfully")
}
catch(err){
    res.status(400).send("Error occured" + err.message)
}
   
}
)

// get user data by email
app.get("/user", async (req, res) => {
    const users = await User.find({email:req.body.email });
    if(users.length ===0){res.status(401).send("User Not Found")}
    else{
    res.send(users);
    }
   
});

// get all user data in database
app.get("/feed", async (req ,res)=>{
    const allUsers = await User.find({})
    res.send(allUsers)
})

//Updating the user data
app.patch("/user",async (req,res) => {  
    const userID =  req.body.userID
    const data =  req.body
    await User.findByIdAndUpdate(userID,data , {runValidators : true})
    res.send("User Updated Successfully")
    
})
//delete API
app.delete("/delete" , async(req ,res)=>{
    const userID =  req.body.userID
    await User.findByIdAndDelete(userID)
    res.send("User Deleted Successfully")
})

// connecting to our DATA BASE OF MongoDB
connectDB().then(
    ()=>{
        console.log("Connection request established Successfully...")
        app.listen(2222, ()=>{console.log("server running successfully")})
    }
).catch(err => {
    console.log("cannot make connection cause "+err.message)
})