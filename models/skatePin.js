let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let UserReviewSchema = require('./userReview')

let SkatePinSchema = new Schema({
  title: { type: String, required: true },
  createdBy: {
    _id: { type: String, required: true },
    userName: { type: String, required: true },
  },
  coordinate: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  description: { type: String },
  photo: { type: String },
  reviews: [UserReviewSchema],
  skateDate: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  expire_at: { type: Date, expires: Date ,default: null },
  pinColor: { type: String, required: true }
});

SkatePinSchema.index({ "expire_at": 1 },{expireAfterSeconds:0})

module.exports = mongoose.model("SkatePin", SkatePinSchema);