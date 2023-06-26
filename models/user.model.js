//DEPENDENCIES
const { Schema, model } = require("mongoose")

//SCHEMA
const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true },
})

module.exports = model("User", UserSchema)