const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlenght : 50
        
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique: true,
        trim :true
    },
    password : {
        type : String
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["male" , "female" , "other"].includes(value)){
                throw new Error("Invalid Gender")
            }
        }
       
    },
    PhotoURL : {
        type: String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNWr0iIiYwfxb1MpyodoY45N8QTPFp-sphaeHtF7gnrA&s=10"
    },
    skills : {
        type : [String]
        
    },
    about:{
        type : String,
        default : "Hi there ! "
    }

})

const User = mongoose.model("User" , userSchema)
module.exports = User