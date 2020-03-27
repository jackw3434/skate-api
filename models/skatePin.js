let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SkatePinSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true, },
  createdBy: { type: String, required: true },
  coordinate: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true }
  },
  description: { type: String, required: true },
  photo: { type: String },
  reviews: [
    {
      reviewerID: { type: mongoose.Types.ObjectId, required: true },
      reviewerName: { type: String, required: true },
      reviewMessage: { type: String, required: true },
    }
  ],
  skateDate: { type: Date },
  startTime: { type: String },
  endTime: { type: String },
  pinColor: { type: String, required: true }
});

module.exports = mongoose.model("SkatePin", SkatePinSchema);