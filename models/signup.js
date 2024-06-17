const mongoose = require('mongoose')

const signup = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model('Signup',signup)