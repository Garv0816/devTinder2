const jwt =  require("jsonwebtoken")
const User =  require("../models/users")

const authUser = async (req,res,next)=>{
try{
    const JWTToken = req.cookies.token
    if(!JWTToken){
        throw new Error("Invalid Token")
    }
    const decodedJWTTOKEN =  jwt.verify(JWTToken , "GarvKing",)
    console.log(decodedJWTTOKEN)
    if(!decodedJWTTOKEN){
        throw new Error("Please Login")
    }
    const UserData =  await User.find({_id : decodedJWTTOKEN})

    req.UserData = UserData
    next()
}catch(Err){
    res.status(400).send("Error Occured"+Err.message)
}
}

module.exports = authUser