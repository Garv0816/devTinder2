const express = require('express')
const connectDB = require("./config/database")
const User = require("./models/users")
const signupValidator =  require("./middleware/Validation")
const bycrypt = require("bcrypt")
const app = express()

app.use(express.json())
// sign up api 
app.post("/signup" , async(req ,res)=>{
try{
    // validating user data ....
    signupValidator(req)

    // encrypting password
    const {firstName , lastName , email, password, skills, gender} = req.body
    const encryptPassword = await bycrypt.hash(password , 10)
    console.log(encryptPassword)
    //saving user to database
    const user = new User({
        firstName,
        lastName,
        email,
        skills,
        gender,
        password : encryptPassword
    })
    await user.save()
    res.send("User Added Successfully")
}
catch(err){
    res.status(400).send("Error occured" + err.message)
}
   
}
)

//login api
app.post("/login" , async(req, res)=>{
    //validation of email
    try{
    const {email , password} = req.body
    const isUserPresent = await User.findOne({email : email})
    if(!isUserPresent){
       throw new Error("Invalid creditial")
    }
    // comparing encrypted passoword hash
    const isPasswordValid = await bycrypt.compare(password , isUserPresent.password)

    if(!isPasswordValid){
        throw new Error("Invalid Credentials")
    }
    res.send("Login successfull")
}


    catch(err){
        res.status(400).send("Logic failed  " + err.message)
    }
    
    // comparing password
})
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
app.patch("/user/:userID",async (req,res) => {  
    try{
    const userID = req.params?.userID
    console.log(req.params)
    const data =  req.body

    const ALLOWED_UPDATE = [
        "firstName" ,
        "lastName",
        "PhotoURL",
        "age",
        "skills",
        "about"
    ]

    const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATE.includes(k))

    if(!isUpdateAllowed){
    throw new Error("This field update is not allowed ")}

    await User.findByIdAndUpdate(userID,data , {runValidators : true})
    res.send("User Updated Successfully")
}
catch(err){
    console.log(err.message)
    res.status(400).send("Data can't be Updated" + err.message)
}
   
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