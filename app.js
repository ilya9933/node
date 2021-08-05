const express = require("express");
const router = require("./routers/auth");
const parser = require("body-parser");
const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use("/api/auth", router);

module.exports = app;
