const express = require("express");
const Router = express.Router();
const path = require("path");
const UserSchema = require("../models/UserSchema");
const bcrypt = require('bcrypt');

// bcrypt.compare(req.body.password, hash, function(err, res) {
//     if(res) {
//         console.log("--- good")
//     } else {
//         // Passwords don't match
//     }
// });


Router.route("/add/").post(function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        req.body.password = hash;
        UserSchema.create(req.body).then((data) => {
            res.json(data);
        });
    });
});

Router.route("/login/").post(function (req, res) {
    UserSchema.find({login : req.body.login}).then((data) => {
        console.log("--- serv", data[0].password);
        bcrypt.compare(req.body.password, data[0].password, function(err, res) {
            if(res) {
                console.log("--- good")
            } else {
                console.log("--- dick");
                // Passwords don't match
            }
        });
    });
});
module.exports = Router;