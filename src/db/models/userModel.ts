const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    passwordHash : {
        type : String,
        required : true
    },
    emailVerified : {
        type : Boolean,
        required : true
    },
    facebookUrl : String,
    instagramUrl : String,
    githubUrl : String,
    behanceUrl : String,
    twitterUrl : String,
    profilePicLink : String,
    bannerImageLink : String,
    bio : String
});

const UserModel = new mongoose.model("User", userSchema);

module.exports = UserModel;