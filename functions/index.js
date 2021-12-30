const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const cors = require("cors");
const indexRouter = require("../routes/index");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};


const app = express();

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/expense", indexRouter);
exports.app = functions.https.onRequest(app);
