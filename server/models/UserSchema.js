const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name : {
        type: String
    },
    login : {
        type: String
    },
    email : {
        type: String
    },
    password : {
        type: String
    }
})

module.exports = mongoose.model("UserSchema", UserSchema)