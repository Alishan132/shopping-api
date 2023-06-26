//DEPENDENCIES
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
require("dotenv").config()

//SCHEMA from mongoDB
const UserSchema = require("../../models/user.model") 

//FUNCTION to generate token
async function generateToken(id, email) {
    const payload = {
        id,
        email
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "3h"})
}

class authController {
//SIGNUP CONTROLLER
    async signup(req, res) {
        try {
            //error handler
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    messages: "Error during registration",
                    errors: errors.array()
                })
            }
            const { email, password } = req.body
            const existingUser = await  UserSchema.findOne({ email });
            if(existingUser){
                return res.status(409).json(`User with email '${email}' already exists`)
            }
        const hashedPassword = await bcrypt.hash(password, 7)
        const newUser = new UserSchema({
            email,
            password: hashedPassword
        })
        await newUser.save()

        res.status(201).json( {newUser} )
        } catch (e) {
            console.log(e)
            res.status(400).json("Registration error")
        }
    
    }
//SIGNIN controller
    async signin(req, res){
        try {
           const { email, password } = req.body
           const existingUser = await UserSchema.findOne({email})
           if(!existingUser) {
            return res.status(401).json(`User with email '${email}' does not exist`)
           }      
           const validPassword = await bcrypt.compare(password,existingUser.password)
           if(!validPassword) {
            return res.status(403).json("Invalid password.")
           } 
           const token = await generateToken(existingUser._id,existingUser.email)
           res.status(200).json({ token })
        } catch (e) {
            console.log(e)
            res.status(400).json("Login error")
        }

    }

    
}

module.exports = new authController()