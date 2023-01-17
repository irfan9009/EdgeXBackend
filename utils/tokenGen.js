const jwt = require("jsonwebtoken")
const { appConstants } = require("../constants/index")
require("dotenv").config({ path: "../.env" })

const generateAuthToken = async (tokenReqBody) => {
  return jwt.sign(tokenReqBody, process.env.AUTH_TOKEN_SECRET, {
    expiresIn: appConstants.TOKEN_EXPIRY
  })
}
module.exports = { generateAuthToken }
