const createError = require("http-errors");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3016;
const mongoose = require("mongoose");
const route = require("./routes");
const session = require("express-session");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// HTTP logger
app.use(morgan("combined"));

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes init
route(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect(
    "mongodb+srv://52000197:khachsan@cluster0.5tcowba.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Example app listening at http://localhost:${PORT}`)
    );
  })
  .catch((e) => {
    throw e;
  });

module.exports = app;
