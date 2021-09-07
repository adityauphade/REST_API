const userData = require('../models/userModel')
const { validationResult, check } = require("express-validator")
const log = require("../logger/loggerFunction")


// signup
// # take all data => validates if it is in correct format =>  validate if email is unique or not => add data in db


// login
// # take data => check if its present in db => create a login token


let userControls = {
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

    async findUserByCredentials(request, response, next){
        let user
        try{
            user = await userData.findOne({email: request.body.email, password: request.body.password})
            if(!user){
                log.error("CANNOT FIND USER")
                return response.status(404).send({message: "USER NOT FOUND"})
            }else{
                return response.status(200).send(user)
            }
        }catch(err){
            log.error("SERVER SIDE ERROR", err)
            response.status(500).send({message: err.message})
        }
    },
    
    async signUpUser(request, response){
        
        const user = new userData({
            fname: request.body.fname,
            lname: request.body.lname,
            email: request.body.email,
            password: request.body.password
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
