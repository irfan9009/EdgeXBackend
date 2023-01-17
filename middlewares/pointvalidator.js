const { userList } = require("../services/userService");

const pointValidate = async function (req, res, next) {
  try {
    const query = { _id: req.user.User.id };
    const result = await userList(query);
    if (result.length > 0) {
      if (result[0].points === 0) {
        return next();
      } else {
        res
          .status(200)
          .json({ success: false, message: "User already answered" });
      }
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

module.exports = { pointValidate };
