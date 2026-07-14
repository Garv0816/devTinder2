const authUser = (req,res,next)=>{
    const token = "xyz"
    const isUserAuthurized = token === "xyz"
    if(!isUserAuthurized){
        res.status(401).send("User is not found")
    }
    else{
        next()
    }
}

module.exports = authUser