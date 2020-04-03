let mongoose = require("mongoose");
let Schema = mongoose.Schema;

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
  reviews: [
    {
      reviewerID: { type: mongoose.Types.ObjectId, required: true },
      reviewerName: { type: String, required: true },
      reviewMessage: { type: String, required: true },
    }
  ],
  skateDate: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  pinColor: { type: String, required: true }
});

module.exports = mongoose.model("SkatePin", SkatePinSchema);