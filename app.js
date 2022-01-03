var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var cors = require("cors");
var indexRouter = require("./routes/index");
var passwordRouter = require("./routes/password");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var app = express();

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/expense", indexRouter);

app.use("/password", passwordRouter);

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("app listen in " + port);
});
module.exports = app;
