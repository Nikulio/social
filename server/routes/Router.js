const express = require("express");
const Router = express.Router();
const path = require("path");
const UserSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");

Router.route("/add").post(function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    req.body.password = hash;
    UserSchema.create(req.body).then((data) => {
      res.json(data);
    });
  });
});

Router.route("/newpost").post(function(req, res) {
  UserSchema.findById(req.body.user).then((user) => {
    const id = function() {
      return (
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9)
      );
    };
    req.body.data.key = id();
    user.posts.unshift(req.body.data);
    user.save();
    res.send(user);
  });
});

Router.route("/user").post(function(req, res) {
  const user = JSON.parse(req.body.id);
  UserSchema.find({ _id: user }).then(
    (data) => {
      res.send(data);
    },
    (err) => {
      console.log("--- err", err);
    },
  );
});

Router.route("/login").post(function(req, res) {
  UserSchema.find({ login: req.body.login }).then((data) => {
    if (data.length === 0) {
      req.app.io.emit("userID", {});
      return false;
    }
    bcrypt.compare(req.body.password, data[0].password, function(
      err,
      userData,
    ) {
      if (userData) {
        req.app.io.emit("userID", data);
      } else {
        req.app.io.emit("userID", {});
      }
    });
  });
});
module.exports = Router;
