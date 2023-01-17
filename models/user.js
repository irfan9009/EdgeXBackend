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
    points:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
