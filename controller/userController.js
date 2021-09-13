const userData = require('../models/userModel')
const { validationResult, check } = require("express-validator")
const log = require("../logger/loggerFunction")
const jwt = require("jsonwebtoken");
require('dotenv').config()
var bcrypt = require('bcrypt')



// signup
// # take all data => validates if it is in correct format =>  validate if email is unique or not => add data in db


// login
// # take data => check if its present in db => create a login token


let userControls = {
    //get all data
    async getUserData(request, response){
        let users
        try{
            users = await userData.find()
            if(users){
                log.info("GETTING DATA - TEST DONE")
                return response.status(200).json(users)
            }else{
                log.error("NO DATA")
                return response.status(404).json(users)
            }
        }catch(err){
            log.error("SERVER SIDE ERROR", err)
            response.status(500).json({message: err.message})
        }
    },

    //reset password
    async ResetPassword(req, res, next){
        let newPassword
        try{
            newPassword = await userData.updateOne({ _id: req.params.id}, { $set: {password: req.body.password}})
            log.info("PWD UPDATED")
            res.status(200).json(newPassword)
        }catch(err){
            log.error("PWD NOT UPDATED", err)
            res.status(400).json({message: err.message})
        }
    },

    //forgot password
    async ForgotPassword(req, res, next){
        let user_email
        try{
            user_email = await userData.findOne({email: req.body.email})
            if(user_email){
                res.status(200).json({user_email})
                next()
            }else{
                log.error('ENTER EMAIL ID')
                res.status(404).json({message: "Email ID Required"})
            }
        } catch (err) {
            log.error("SERVER SIDE ERROR", err)
            res.status(500).json({ message: "HAHAHAHHAHA" })
            // res.status(500).json({ message: err.message })
        }
    },

    //login
    async findUserByCredentials(request, response, next){
        let user
        user = await userData.findOne({email: request.body.email})
        if(!user){
            log.error("CANNOT FIND USER")
            response.status(404).json({message: "USER NOT FOUND"})}
        try{
            if(await bcrypt.compare(request.body.password, user.password)){
                const token = jwt.sign(
                    { user_id: user._id, user_email: user.email },
                    process.env.TOKEN_KEY,
                    {expiresIn: "24h"}
                );
                //creation of key
                user.token = token;
                log.info("LOGIN SUCCESSFUL")
                response.status(200).json(user)
            }else{
                log.error("PASSWORD INCORRECT", err)
                response.status(500).json({message: err.message + 'password incorrect'})
            }
            
        }catch(err){
            log.error("SERVER SIDE ERROR", err)
            response.status(500).json({message: err.message})
        }
    },
    
    //signup
    async signUpUser(request, response){
        
        //hash pwd
        const hashedPwd = await bcrypt.hash(request.body.password, 10)
        //store in db
        const user = new userData({
            fname: request.body.fname,
            lname: request.body.lname,
            email: request.body.email,
            password: hashedPwd,
        })

        console.log(user)

        if(response.user.length != 0){
            log.error("USER ALREADY EXISTS")
            response.status(422).json({message: "userData already exists"})
        } 
        else {
            try{
                const newUser = await user.save()
                log.info("USER ADDED")
                response.status(201).json(newUser)
            } catch(err) {
                log.error("USER NOT ADDED", err)
                response.status(400).json({ message: err.message })
            }
        }
    },

    async getUserByEmail(request, response, next){
        let user

        //checks if same email is present in db or not
        try{
            user = await userData.find({email:request.body.email})
        } catch (err) {
            return res.status(500).json({ message:err.message })
        }

        //if false, this would be empty
        response.user = user
        next()
    },

    validateUser(request, response, next){
        const errors = validationResult(request)

        if(errors.isEmpty()){
            return next()
        }

        log.error("VALIDATE ERRORS")
        
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        return response.status(422).json({
            errors: extractedErrors,
          })
    },

    validateRules(){
        return [
            check("fname")
            .not().isEmpty()
            .withMessage("First Name is required")
            .isAlpha()
            .withMessage("First Name should only contain alphabetical characters")
            .isLength({min:3})
            .withMessage("First Name should atleast have 3 characters"),
    
            check("lname")
            .not().isEmpty()
            .withMessage("Last Name is required")
            .isAlpha()
            .withMessage("Last Name should only contain alphabetical characters")
            .isLength({min:3})
            .withMessage("Last Name should atleast have 3 characters"),
    
            check("email")
            .isEmail()
            .withMessage("Please enter a valid Email-ID"),
    
            check("password")
            .isLength({min:3})
            .withMessage("Password must have atleast 3 characters"),
        ]
    }
    
}

module.exports = userControls
