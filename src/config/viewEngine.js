const path = require("path");
const express = require("express");

// config view engine for an express application
module.exports = (app) => {
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "../public")));
};
