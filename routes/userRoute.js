const express = require('express')
const router = express.Router()

const log = require("../logger/loggerFunction")
const userControls = require('../controller/userController')
const mailerFunctions = require('../util/mailer')

// use the verify function everytime the REST APIs are called => EG: before the validateRules in signup API

// Signup
router.post("/Signup", userControls.validateRules(), userControls.validateUser, userControls.getUserByEmail, userControls.signUpUser)

// Test
router.get("/UserData", userControls.getUserData)

// login
router.post("/Login", userControls.findUserByCredentials)

// forget password
router.post('/ForgotPassword', userControls.ForgotPassword, mailerFunctions.sendMail)

// reset password
router.post('/ResetPassword/:id', userControls.ResetPassword)


module.exports = router

