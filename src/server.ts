const express = require("express")
const cors = require("cors")
require("dotenv").config()


const app = express()
const port = process.env.PORT


app.get("/", (req : any,res : any)=>{
    res.send("Hello world")
})





app.listen(port, ()=> {
    console.log("Server started listening on port ", port)
})


