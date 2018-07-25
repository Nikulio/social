const express = require("express");
const Router = express.Router();
const UserSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");

Router.route("/add").post(function(req, res) {
  UserSchema.findOne({ login: req.body.login }).then((checkOne) => {
    UserSchema.findOne({ email: req.body.email }).then((checkTwo) => {
      if (checkOne === null && checkTwo === null) {
        req.app.io.emit("userExists", null);
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          req.body.password = hash;
          UserSchema.create(req.body).then((data) => {
            res.send(data);
          });
        });
      } else {
        req.app.io.emit("userExists", { message: "User exists" });
        res.send({ message: "User exists" });
      }
    });
  });
});

Router.route("/new_post").post(function(req, res) {
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

Router.route("/find_user").post(function(req, res) {
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
      res.send(err);
      console.log("--- err", err);
    },
  );
});

Router.route("/confirm_friend").post(function(req, res) {
  UserSchema.findOne(
    { _id: req.body.self }).then(
    (self) => {
      UserSchema.findOneAndUpdate(
        { _id: req.body.whom },
        { $push: { friends: req.body.self } },
        function(error, success) {
          if (error) {
            console.log(error);
            res.send(error)
          } else {
            self.friends.push(req.body.whom);
            self.requests.splice(self.requests.indexOf(success), 1);
            self.save();
            res.send(success);
          }
        });
    },
  );
});

Router.route("/add_friend").post(function(req, res) {
  UserSchema.find({ _id: req.body.to }).then(
    (to) => {
      UserSchema.find({ _id: req.body.from }).then(
        (from) => {
          to[0].requests.push(from[0]);
          to[0].save();
          res.send("success");
        },
        (err) => {
          res.send(err);
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
