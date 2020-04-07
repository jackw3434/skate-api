let UserReview = require('../../models/userReview');
let User = require('../../models/user');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/reviewSkater/:id').post(auth.required,function (req, res) {

        if (!hasPermission(req.tokenData, "reviewSkater.post", req, res)) return;

        Users.findById({ _id: req.params.id }, function (err, user) {

            if (err || !user || user.length == 0) {
                return res.status(400).send('Validation_error, No matching User for id ' + req.params.id);
            }

            let review = new UserReview(req.body.review)

            user.reviews.push(review);

            user.save(function (err, reviewedUser) {

                if (err) {
                    if (err.code == 11000) {
                        console.log(err);
                        return res.status(409).json('Duplication, save_failed, Unable to Save New Review: ' + review);
                    }
                    return res.status(400).send(err);
                }
    
                return res.status(200).json("Review: " + review + " has been created." + reviewedUser);
            })      
        })      
    });
}