const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName :{
        type: String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    secret:{
        type:String
    }
})

const User = new mongoose.model('userModel', userSchema);

module.exports = User;