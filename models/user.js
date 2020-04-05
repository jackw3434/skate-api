let mongoose = require("mongoose");
let UserReviewSchema = require('./userReview')
let Schema = mongoose.Schema;

let UserSchema = new Schema({
 // profilePicture: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: String },
 // region: { type: String },
  skateStance: { type: String },
 // styleOfSkating: [{ type: String }],
 // reasonsForUsingTheApp: [{ type: String }],
  achievedTricks: [{ type: String }],
  usersCreatedPins: [{ type: String }],
  password: { type: String, required: true },
  reviews: [UserReviewSchema],
  role: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
