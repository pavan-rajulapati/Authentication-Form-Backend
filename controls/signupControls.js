const Signup = require('../models/signup')
const bcrypy = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')

dotEnv.config()
const secretKey = process.env.SECRET_KEY || "this is default key value";

const handleSignup = async (req,res)=>{
    try {
        const {userName,mail,password} = req.body
        const isExist = await Signup.findOne({mail})

        if(isExist){
            console.log('user already existed')
            return res.status(401).json({message:'user already existed'})
        }

        const hashedPass = await bcrypy.hash(password,9)

        const existingPassword = await Signup.findOne({ password: hashedPass });

        if (existingPassword) {
            console.log('user already exists');
            return res.status(401).json({ message: 'user already exists' });
        }
        const newUser = new Signup({
            userName,
            mail,
            password:hashedPass,
            createdAt:Date.now()
        })
        newUser.save()

        console.log('user registred successfully')
        return res.status(200).json({message:'user registred successfully'})
    } catch (error) {
        console.log('Internal Error',error.message)
        return res.status(404).json({message:"Internal Error"})
    }
}


const handleSignin = async (req,res)=>{
    try {
        const {mail,password} = req.body
        const isExist = await Signup.findOne({mail})

        if(!isExist){
            console.log('user not exist')
            return res.status(401).json({message:'Invalid Credintials'})
        }

        const token = await jwt.sign({userId : isExist._id},secretKey,{expiresIn : '24h'})
        const checkPass = await bcrypy.compare(password,isExist.password)
        if(!checkPass){
            console.log('user not exist')
            return res.status(401).json({message:'Invalid Credintials'})
        }

        console.log('User Logged Successfully')
        return res.status(200).json({message:'success',token:token})
    } catch (error) {
        console.log('Internal Error',error.message)
        return res.status(404).json({message:'Internal Error'})
    }
}

module.exports = {handleSignup,handleSignin}