//DEPENDENCIES
const express = require("express")
const { check } = require("express-validator")

const router = express.Router()

//CONTROLLERS
const authController = require("./auth.controller")

//ENDPOINTS
//Signup the user
router.post("/signup",
    [
        check("email", "The email cannot be empty").notEmpty(),
        check("password").isLength({min:4, max: 12}).withMessage("The password must be more than 4 and less than 12 characters")
    ],
    authController.signup
    )

//Signin the user
router.post("/signin", authController.signin)

module.exports = router 