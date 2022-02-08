"use strict";

const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./server/config/database");
const router = require("./server/routes/index");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

router(app, db);

app.get("/", (req, res) => {
  res.send(JSON.stringify(req.headers));
});

db.sequelize
  .sync()
  .then(() => {
    console.log(">DB connected");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`> Server started on port ${PORT}`);
    });
  });
