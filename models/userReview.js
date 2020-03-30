let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserReviewSchema = new Schema({
    reviewerID: { type: mongoose.Types.ObjectId, required: true },
    reviewerName: { type: String, required: true },
    reviewMessage: { type: String, required: true },
});

module.exports = mongoose.Schema(UserReviewSchema);
