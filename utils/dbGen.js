require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const { userCreate } = require("../services/userService");
const data = require("../utils/email.json");
const User = require("../models/user");
const dbgen = async function () {
  try {
    const result = await Promise.all(
      data.map(async (ele) => {
        const user = new User({
          firstName: ele.firstName,
          lastName: ele.lastName,
          email: ele.email,
        });
        const output = await userCreate(user);
        return output;
      })
    );
    if (result.filter((ele) => ele === undefined).length === 0) {
      console.log("Users created successfully");
      return result;
    }
  } catch (err) {
    console.log("object :>> ", object);
    throw err;
  }
};
const gen = async function () {
  try {
    mongoose.connect(
      process.env.DB_LOCAL,
      { dbName: process.env.DB_NAME, autoIndex: true, autoCreate: true },
      (err) => {
        if (err) console.log(err);
        else console.log("mongdb is connected");
      }
    );
    let result = await dbgen();
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
gen();
