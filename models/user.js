let mongoose = require("mongoose");
let UserReviewSchema = require('./userReview')
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reviews: [UserReviewSchema],
  role: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
