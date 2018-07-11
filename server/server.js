const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const path = require("path")
const socketIO = require("socket.io")
const mongoose = require("mongoose")
const http = require("http")

const {mongo} = require("./database/db");
const Router  = require("./routes/Router");
const PORT = process.env.PORT || 5000;
const DB = process.env.MONGOLAB_URI || mongo;
const buildPath = path.join(__dirname, "../build");

mongoose.connect(DB).then(() => {
    console.log("--- mongo is up right here: ", DB);
}, (err) => {
    console.log("--- db error at", err);
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", Router);
app.use(express.static(buildPath));

const server = http.createServer(app);
const io = socketIO(server)
io.on('connection', socket => {
    console.log('User connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

app.io = io;


server.listen(PORT, () => {
    console.log("--- server is successfully up at: ", PORT);
});






