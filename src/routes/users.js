const express = require("express")
const authUser = require("../middleware/auth")
const connectionsRequest = require("../models/connectionRequest")
const userRouter = express.Router()

userRouter.get("/user/connection/received" , authUser ,async(req , res)=>{
    try{
        const loggedInUser = req.UserData  
        const receivedConnection = await connectionsRequest.find({
            toUserID : loggedInUser,
            status : "interested"
        }).populate("fromUserID" , ["firstName" , "lastName"])
        res.send(receivedConnection)
        
    }catch(err){
        res.status(400).send("Error  " +err.message)
    }

})
module.exports = userRouter