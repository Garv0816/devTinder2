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


module.exports = signupValidator