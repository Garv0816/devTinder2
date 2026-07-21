const express = require("express")
const authUser = require("../middleware/auth")
const connectionsRequest = require("../models/connectionRequest")
const User = require("../models/users")
const connectionRequestRouter = express.Router()

connectionRequestRouter.post("/request/send/:status/:userID" ,authUser ,async(req,res)=>{
    try{
    const fromUserID = req.UserData._id
    const toUserID = req.params.userID
    const status = req.params.status

    const allowedStatus = ["interested" , "ignored"]
    const validStatus = allowedStatus.includes(status)
    if(!validStatus){
        return res.status(400).json({
            message:"Invalid status type"
        })
    }

    if(fromUserID.equals(toUserID)){
         return res.status(400).json({
            message:"cannot send request to yourself "
        })
    }
    const ifConnectionRequestExist = await connectionsRequest.findOne({
        $or:[{ toUserID,fromUserID},
            {toUserID:fromUserID , fromUserID:toUserID}
            ]
       
    })

    if(ifConnectionRequestExist){
        return res.status(400).send("Connection Request Exists")
    }

    const isUserPresentinDB = await User.findById(toUserID)
    if(!isUserPresentinDB){
        return res.status(400).send("Invalid Request")
    }
    const newConnectionRequest = new connectionsRequest({
        fromUserID,
        toUserID,
        status
    })

    await newConnectionRequest.save()
    res.send("Successfully connection request send")
}catch(err){
    res.status(400).send("Error" +err.message)
}
})

connectionRequestRouter.post("/request/review/:status/:requestID",
    async(req , res)=>{
        const {status , requestID} = req.params
        // status == valid
        const allowedStatus = ["accepted" , "rejected"]
        const isStatusValid  = allowedStatus.includes(status)

        if(!isStatusValid){
            res.status(400).json({message : " Status is not valid !"})
        }
        // toUser == logged in user
        const loggedInUser = req.params.requestID

        const pendingConnectionRequest =  await connectionsRequest.findOne({
            _id : requestID,
            toUserID : loggedInUser,
            status : interested
        })
        if(!pendingConnectionRequest){
            res.status(400).json({
                message :"Connection request not found !"
            })
        }

        pendingConnectionRequest.status = status
        const dataOfAcceptedRequest = await pendingConnectionRequest.save()
        res.send(dataOfAcceptedRequest)
    }
)
module.exports = connectionRequestRouter