const express = require('express')
const router = express.Router()
const log = require("../logger/loggerFunction")
const userControls = require('../controller/userController')

// Signup
router.post("/Signup", userControls.validateRules(), userControls.validateUser, userControls.getUserByEmail, userControls.signUpUser)

// Test
router.get("/", (request, respond) => {
    respond.send()
})

// login
router.get("/login/", userControls.findUserByCredentials)


module.exports = router