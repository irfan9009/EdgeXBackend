require("dotenv").config({ path: "./.env" });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { authdecode } = require("./middlewares/auth")

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

//route imports
const userRoute = require("./routes/userRoute");
const puzzleRoute = require("./routes/puzzleRoute");

// Authentication enabler
app.all("*", authdecode)

// routes
app.use("/user", userRoute);
app.use("/puzzle", puzzleRoute);

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DB_LOCAL,
  { family: 4, dbName: process.env.DB_NAME, autoIndex: true, autoCreate: true },
  () => {
    console.log(`DB connected on ${process.env.DB_LOCAL}`);
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
