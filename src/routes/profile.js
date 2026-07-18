const express = require("express")
const authUser = require("../middleware/auth")
const User = require("../models/users")
const {updateValidation} = require("../middleware/Validation")
const profileRouter =  express.Router()

profileRouter.get("/profile/view", authUser, async(req,res)=>{
    try{
    const UserDataBase = req.UserData
    if(!UserDataBase){
        throw new Error("Can't fetch the User")
    }
    res.send(UserDataBase)
    }
    catch(err){
        res.status(400).send("Error Occured" +err.message)
    }
  
})

profileRouter.patch("/profile/edit/:userID", authUser,async(req,res)=>{
    try{
    updateValidation(req)
    const JsonDataForUpdate = req.body
    const userID = req.params.userID
    //console.log(userID)
   const allowedUpdateData = await User.findByIdAndUpdate({_id : userID}, JsonDataForUpdate)
  
   await allowedUpdateData.save()
   res.send(allowedUpdateData)
    }
    catch(err){
        res.status(400).send("error while updating profile  "+ err.message)}
})
module.exports = profileRouter