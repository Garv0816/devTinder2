const mongoose = require("mongoose")
const validator =  require("validator")
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
        trim :true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Not Valid")
            }
        }
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
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNWr0iIiYwfxb1MpyodoY45N8QTPFp-sphaeHtF7gnrA&s=10",

        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url")
            }
        }


    },
    skills : {
        type : [String]
        
    },
    about:{
        type : String,
        default : "Hi there ! ",
        min : 10,
        max : 100
    }

},
{timestamps : true})

const User = mongoose.model("User" , userSchema)
module.exports = User