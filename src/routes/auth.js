const express = require("express")
const authRouter = express.Router()
const {signupValidator} =  require("../middleware/Validation")
const bycrypt = require("bcrypt")
const User = require("../models/users")
const jwt =  require("jsonwebtoken")
const authUser =  require("../middleware/auth")
//SIGN UP API
authRouter.post("/signup" , async(req ,res)=>{
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

//LOGIN API
authRouter.post("/login" , async(req, res)=>{
    //validation of email
    try{
    const {email , password} = req.body
    const isUserPresent = await User.findOne({email : email})
    //console.log(isUserPresent._id)
    if(!isUserPresent){
       throw new Error("Invalid creditial")
    }
    // comparing encrypted passoword hash
    const isPasswordValid = await bycrypt.compare(password , isUserPresent.password)

    if(!isPasswordValid){
        throw new Error("Invalid Credentials")
    }

    const JWTTOKEN = await jwt.sign({_id: isUserPresent._id},"GarvKing")

    res.cookie("token", JWTTOKEN)
    res.send("Login successfull")
   
}


    catch(err){
        res.status(400).send("Logic failed  " + err.message)
    }

})

// LOGOUT API
authRouter.post("/logout",authUser ,(req,res)=>{
const token = req.cookies.token;
res.cookie("token",null,{
    expires: new Date(Date.now())
})
res.send("Logout Successful")
})



module.exports = authRouter