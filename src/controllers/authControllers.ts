import { Request, Response } from "express";

export {}
const express = require("express");
const router = express.Router();

const {registerNewUser, checkExistingUser} = require("../services/authServices")


/**
 * register controller
 * username, emailid, password
 */
router.post("/register/email", async (req : Request & { session : any}, res : Response) => {
    const {userName, email, password } = req.body
    try{
    const userExists = await checkExistingUser(email)
    if(userExists) return res.status(409).json({status : false, data : "User with the email exists"})
    const registeredUser = await registerNewUser(email, password, userName)
    if(!Object.keys(registeredUser).length) throw new Error("Couldnot create user at this time")
    // register session and send cookie
    req.session.user = registeredUser._id
    return res.status(200).json({status : true, data : registeredUser})
    } catch (e){
        console.log(e)
        res.status(400).json({status : false, message : "something went wrong with server"})
    }
});

//login controller
router.post("/login", (req : Request, res : Response) => {
    console.log("login")
});


module.exports = router;