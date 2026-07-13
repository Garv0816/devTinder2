const express = require('express')
const app = express()

//app.use("/",(req,res)=>res.send("Hello from server"))
app.use("/test",(req,res)=>res.send("Hello test "))
app.use("/hello",(req,res)=>res.send("Hello Hello hello"))


app.listen(2222, ()=>{console.log("server running successfully")})