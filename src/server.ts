import { Request, urlencoded } from "express"
export {}
const express = require("express")
const cors = require("cors")
require("dotenv").config()
const {port, dbString, environment} = require("./configs/baseConfig")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const {uuidv4} = require("uuid")
const app = express()

app.use(express.json())
app.use(urlencoded({extended : true}))
app.use(cors())
if(environment === "production"){
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'vladmirputlik',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true, maxAge : 7*24*60*60*1000 },
        genId : (req : Request) => uuidv4(),
        store: MongoStore.create({
            mongoUrl : dbString,
            autoRemove : 'native'
          })
      }))
} else {
    app.use(session({
        secret : "scaredycat",
        cookie : {
            maxAge : 7*24*60*60*1000,
            secure : false,
            httpsOnly : false
        },
        genId : (req : Request) => uuidv4(),
        store: MongoStore.create({
            mongoUrl : dbString,
            autoRemove : 'native'
          }),
        resave: false,
        saveUninitialized: false
    }))
}


const authControllers = require("./controllers/authControllers")


//register controller middlewares
app.use("/api/auth", authControllers)




mongoose.connect(dbString, (err : any)=>{
    if(err) throw(`Database connection error : ${err} `)
    console.log("connection established to database")
    app.listen(port, ()=> {
        console.log("Server started listening on port ", port)
    })
})



