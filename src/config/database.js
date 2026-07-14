const mongoose = require("mongoose")

const connectDB = async ()=>{
    await mongoose.connect ("mongodb+srv://garv020596_db_user:7AP0crNYUYEs1NkJ@cluster0.87nqsnh.mongodb.net/DevTinder2")
}

module.exports = connectDB
