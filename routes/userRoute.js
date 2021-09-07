const express = require('express')
const router = express.Router()

const log = require("../logger/loggerFunction")
const userControls = require('../controller/userController')

// Signup
router.post("/Signup", userControls.validateRules(), userControls.validateUser, userControls.getUserByEmail, userControls.signUpUser)

// Test
router.get("/UserData", userControls.getUserData)

// login
router.get("/Login", userControls.findUserByCredentials)


module.exports = router