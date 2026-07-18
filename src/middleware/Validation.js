const validator = require("validator")

const signupValidator = (req)=>{
    const {firstName , skills} = req.body

    if(!firstName){
        throw new Error("Enter Name!!")
    }
    if(skills.length > 6){
        throw new Error("  Over Max skill limit")
    }
}

const updateValidation = (req)=>{
// try{
    console.log("validation start")
    //console.log("req==>",req)
    const allowedUpdates = [
        "firstName",
        "lastName",
        "gender",
        "age",
        "skills",
        "about"
    ]
    console.log("req.body",req.body)
    const userData = req.body
    console.log("userdata=>",userData)
    const isUpdateValid = Object.keys(userData).every(k => allowedUpdates.includes(k))
    if(!isUpdateValid){
        throw new Error ("Update is not valid")
    }
    console.log("validation clear")
// }   
// catch(err){
//         res.status(400).send("can not update profile" +err.message)
//     }
}
module.exports = {signupValidator, updateValidation}
