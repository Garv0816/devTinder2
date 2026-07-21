const express = require('express')
const connectDB = require("./config/database")
const cookieParsal = require("cookie-parser")
const authRouter =  require("../src/routes/auth")
const profileRouter = require('./routes/profile')
const connectionRequestRouter = require('./routes/connectionRequest')
const app = express()

app.use(express.json())
app.use(cookieParsal())

//ROUTERR
app.use("/", authRouter)
app.use("/", profileRouter)

//conection request routers
app.use("/", connectionRequestRouter)
// connecting to our DATA BASE OF MongoDB
connectDB().then(
    ()=>{
        console.log("Connection request established Successfully...")
        app.listen(2222, ()=>{console.log("server running successfully")})
    }
).catch(err => {
    console.log("cannot make connection cause "+err.message)
})