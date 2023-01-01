const { query } = require("express");
const User = require("../models/user");
userCreate = async function (user) {
  try {
    const result = await user.save();
    return result;
  } catch (error) {
    console.log("error :>> ", error);
    throw error;
  }
};

userUpdate = async function (id, user) {
  try {
    const result = await User.findByIdAndUpdate(id, user);
    return result;
  } catch (error) {
    console.log("error :>> ", error);
    throw error;
  }
};

userList = async function (queryParams, select, sort, skip, limit) {
  try {
    const result = await User.find(queryParams)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    return result;
  } catch (error) {
    console.log("error :>> ", error);
    throw error;
  }
};
// userCreate=async function(user){
//     try{

//     }catch (error){
//         console.log('error :>> ', error);
//         throw error;
//     }
// }
module.exports = { userCreate, userUpdate, userList };
