const express = require('express')
const {handleSignup,handleSignin} = require('../controls/signupControls')

const routes = express.Router()
routes.post('/user',handleSignup)
routes.post('/login',handleSignin)

module.exports = routes