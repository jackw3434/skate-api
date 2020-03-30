let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, },
  password: { type: String, required: true },
  reviews: {
    reviewerID: { type: mongoose.Types.ObjectId, required: true },
    reviewerName: { type: String, required: true },
    reviewMessage: { type: String, required: true },
  },
  role: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
