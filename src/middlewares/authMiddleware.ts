const {getUserById} = require("../services/userService")

const authMiddleware : any = {}

authMiddleware.checkSessionUser = async (req : any, res : Response, next : Function) => {

    if(req.session && req.session.user){
        const user = await getUserById(req.session.user, [])
        if(!user) throw Error("Uer does not exist")
        req.userLoggedIn = true;
        req.user = user
        next()
    }
    req.userLoggedIn = false
    req.user = {}
    next()

}

module.exports = authMiddleware