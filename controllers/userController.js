const User = require("../models/user");
const { userCreate, userUpdate, userList } = require("../services/userService");
let sort = { createdAt: -1 };
let skip = 0;
let limit = 10;

userPost = async function (req, res) {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    const result = await userCreate(user);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Succesfully Created User",
        data: result.id,
      });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ success: false, message: error });
  }
};
userPut = async function (req, res) {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    const result = await userUpdate(req.body.id, user);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Succesfully Updated User",
        //data: result.id,
      });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ success: false, message: error });
  }
};
userGetAll = async function (req, res) {
  try {
    skip = req.query.skip || skip;
    limit = req.query.limit || limit;

    const select = "firstName lastName email";
    const result = await userList({}, select, sort, skip, limit);
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Data Fetch SUccesful",
        data: result,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Could not find any users" });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ success: false, message: error });
  }
};

userGetSpecific = async function (req, res) {
  try {
    skip = 0;
    limit = 1;
    const query = { _id: req.params.id };
    const select = "firstName lastName email";
    const result = await userList(query, select, sort, skip, limit);
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Data Fetch SUccesful",
        data: result,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Could not find any users" });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ success: false, message: error });
  }
};

userLogin = async function (req, res) {
  try {
    skip = 0;
    limit = 1;
    const query = { email: req.query.email };
    const select = "firstName lastName email";
    const result = await userList(query, select, sort, skip, limit);
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Login Successful",
        data: result,
      });
    } else {
      res.status(500).json({ success: false, message: "Login Error" });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ success: false, message: error });
  }
};
// userPost = async function (req, res) {
//   try {
//   } catch (error) {
//     console.log("error :>> ", error);
//     res.status(500).json({success:false, message:error});
//   }
// };
module.exports = { userPost, userPut, userGetAll, userGetSpecific, userLogin };
