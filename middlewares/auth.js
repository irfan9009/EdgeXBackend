const jwt = require("jsonwebtoken")
const { appConstants } = require("../constants/index")

const authdecode = (req, res, next) => {
  try {
    if (["/user/login"].includes(req.path)) {
      return next()
    }

    let token = req.header("authorization")
    if (!token) {
      res
        .status(401)
        .json({ data: {}, message: "Token missing", success: false })
      return
    }
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from token string
      token = token.slice(7, token.length).trimLeft()
    }
    const verified = jwt.verify(token, process.env.AUTH_TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    console.log(error)
    if (["JsonWebTokenError", "TokenExpiredError"].includes(error.name)) {
      res.status(401).json({ success: false, message: error.message })
    } else {
      res.status(500).send({ success: false, message: "Internal Server Error" })
    }
  }
}

module.exports = { authdecode }
