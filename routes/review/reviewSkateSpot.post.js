let SkatePin = require('../../models/skatePin');
let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router) {
    router.route('/reviewSkateSpot/:id').post(auth.required, function (req, res) {

        if (!hasPermission(req.tokenData, "skateSpotReview.post", req, res)) return;

        SkatePin.findById({ _id: req.params.id }, function (err, pin) {

            if (err || !pin) {
                return res.status(400).send('Validation_error, No matching Skat Spot for id ' + req.params.id);
            }

            let review = {
                reviewerID : req.tokenData.user_id,
                reviewerName : req.tokenData.user_name,
                reviewMessage : req.body.review
            }           

            pin.reviews.push(review);

            pin.save(function (err, reviewedPin) {

                if (err) {
                    if (err.code == 11000) {
                        console.log(err);
                        return res.status(409).json('Duplication, save_failed, Unable to Save New Review: ' + reviewedPin);
                    }
                    return res.status(400).send("spot review error "+err);
                }

                return res.status(200).json("Review has been created.");
            })
        })
    });
}