import { Request, Response } from "express";

export {}
const express = require("express");
const router = express.Router();

const {registerNewUserWithEmail, checkExistingUser, loginWithEmail} = require("../services/authServices")
const {getUserByEmail} = require("../services/userService.ts")
const {checkSessionUser} = require("../middlewares/authMiddleware")


/**
 * register controller
 * username, emailid, password
 */
router.post("/register/email", async (req : Request & { session : any}, res : Response) => {
    const {userName, email, password } = req.body
    if(!email || !userName || !password) res.status(400).json({status : false, data : "UserName, Email and Password are required"})
    try{
    const userExists = await checkExistingUser(email)
    if(userExists) return res.status(409).json({status : false, data : "User with the email exists"})
    const registeredUser = await registerNewUserWithEmail(email, password, userName)
    if(!Object.keys(registeredUser).length) throw new Error("Couldnot create user at this time")
    req.session.user = registeredUser._id
    return res.status(200).json({status : true, data : registeredUser})
    } catch (e){
        console.log(e)
        res.status(400).json({status : false, message : "something went wrong with server"})
    }
});

//login controller
router.post("/login", async (req : Request, res : Response) => {
    const {email, password } = req.body
    if(!email || !password) res.status(400).json({status : false, data : "Email and Password are required"})
    try {
        const userExists = await checkExistingUser(email)
        if(!userExists) res.status(404).json({status : false, data : "Email or password didnt match"})
        const user = await getUserByEmail(email)
        const canLogin = await loginWithEmail(user, password)
        if(!canLogin) res.status(404).json({status : false, data : "Email or password didnt match"})
        res.status(200).json({status : true, data : user})
    } catch(err){
        res.status(400).json({status : false, data : "Something went wrong with the server"})
    }

});

router.get("/local", checkSessionUser,async (req: any, res : Response) => {
    if(req.userLoggedIn){
        return res.status(200).json({status : true, data : req.user})
    }
    return res.status(200).json({status : false, data : req.user})
})


module.exports = router;