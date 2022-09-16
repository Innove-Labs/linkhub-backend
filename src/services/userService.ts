const userService : any = {}
const User = require("../db/models/userModel")

userService.getUserByEmail = async (email : string, projection : string[]) => {
    try{
        const user = await User.findOne({email : email}, projection)
        return user
    } catch(err){
        return err
    }

}

userService.getUserById = async (userId : string, projection : string[]) => {
    try {
        const user = await User.findOne({_id : userId}, projection)
        return user

    } catch(err){
        return err
    }
}

module.exports = userService