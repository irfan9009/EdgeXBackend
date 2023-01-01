const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
