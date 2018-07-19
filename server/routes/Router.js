const express = require("express");
const Router = express.Router();
const path = require("path");
const UserSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");

Router.route("/add").post(function(req, res) {
  UserSchema.findOne({ login: req.body.login }).then((data) => {
    if (data === null) {
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password = hash;
        UserSchema.create(req.body).then((data) => {
          res.json(data);
        });
      });
    } else {
      res.json({ message: "User exists" });
    }
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

Router.route("/finduser").post(function(req, res) {
  UserSchema.findOne({ login: req.body.login }).then((user) => {
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

Router.route("/addfriend").post(function(req, res) {
  console.log("--- body here", req.body);
  UserSchema.find({ _id: req.body.to }).then(
    (to) => {
      UserSchema.find({ _id: req.body.from }).then(
        (from) => {
          console.log("--- to", to);
          to[0].requests.push(from[0]);
          to[0].save();
          res.send("success");
        },
        (err) => {
          console.log("--- err", err);
        },
      );
    },
    (err) => {
      console.log("--- err", err);
    },
  );
});

Router.route("/login").post(function(req, res) {
  UserSchema.find({ login: req.body.user }).then((data) => {
    if (data.length === 0) {
      req.app.io.emit("userID", null);
      return false;
    }
    bcrypt.compare(req.body.password, data[0].password, function(
      err,
      userData,
    ) {
      if (userData) {
        req.app.io.emit("userID", data);
      } else {
        req.app.io.emit("userID", null);
      }
    });
  });
});
module.exports = Router;
