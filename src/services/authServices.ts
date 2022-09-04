export {}
const UserModel = require("../db/models/userModel")
const bcrypt = require("bcrypt")
const saltRounds = 10

const authServices : any = {}

authServices.registerNewUser = async (email : string, password : string, userName : string) => {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new UserModel({
        email,
        passwordHash,
        userName,
        emailVerified : false
    })
    const savedUser = await user.save()
    return {
        email : savedUser.email,
        userName : savedUser.userName,
        emailVerified : savedUser.emailVerified
    }
}

authServices.checkExistingUser = async (email : string) : Promise<boolean> => {
    const userExists = await UserModel.findOne({email : email}, "email")
    if(userExists) return true
    return false
}

module.exports = authServices
