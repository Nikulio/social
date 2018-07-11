const express = require("express");
const Router = express.Router();
const path = require("path");
const UserSchema = require("../models/UserSchema");
const bcrypt = require('bcrypt');

Router.route("/add/").post(function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        req.body.password = hash;
        UserSchema.create(req.body).then((data) => {
            res.json(data);
        });
    });
});

Router.route("/login/").get(function (req, res) {
    res.send(req.cookies)
});


Router.route("/login/").post(function (req, res) {
    UserSchema.find({login: req.body.login}).then(
        (data) => {
            if (data.length === 0) {
                req.app.io.emit('userID', {});
                return false
            }
            bcrypt.compare(req.body.password, data[0].password, function (err, userData) {
                if (userData) {
                    req.app.io.emit('userID', {userID: data[0].login});
                } else {
                    req.app.io.emit('userID', {});
                }
            });
        }
    )
});
module.exports = Router;