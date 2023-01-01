require("dotenv").config({ path: "./.env" });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
//route imports
const userRoute = require("./routes/userRoute");

app.use("/user", userRoute);
console.log(process.env.DB_LOCAL);
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
