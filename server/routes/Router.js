const express = require("express");
const Router  = express.Router();
const path = require("path");

Router.route("/").get((req, res) => {
    res.send("Hello, world");
})

module.exports = Router;