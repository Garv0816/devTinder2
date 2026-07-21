const mongoose = require("mongoose")

const connectionSchema = new mongoose.Schema({
toUserID :{
    type: mongoose.Schema.Types.ObjectId,
    required: true
},
fromUserID :{
    type : mongoose.Schema.Types.ObjectId,
    ref  :  "User", 
    required: true
},
status :{
    type: String,
    required: true, 
    enum :{
        values :["interested" , "ignored" , "accepted" , "rejected"],
        message : "Status is not valid !"
    }
} 
},{timestamps : true})

connectionSchema.indexes({toUserID :1 ,fromUserID :1})

const connectionsRequest = new mongoose.model("connectionsRequest", connectionSchema)

module.exports = connectionsRequest