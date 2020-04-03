let User = require('../../models/user');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/users/me/:id').put(auth.required, function (req, res) {

        User.findById({ _id: req.params.id }, function (err, user) {

            if (err) {
                return res.status(400).send(err);
            }           

            let {} = req.body;

            user = req.body;
            // user.profilePicture = req.body.profilePicture;
            // user._name = req.body.name;
            // user.age = req.body.age;
            // user.region = req.body.region
            // user.skateStance = req.body.skateStance;
            // user.styleOfSkating = req.body.styleOfSkating;
            // user.reasonsForUsingTheApp = req.body.reasonsForUsingTheApp;
            // user.achievedTricks = req.body.achievedTricks;

            user.save(function (err, editedUser) {

                if (err) {
                    return res.status(400).send(err);
                }

                return res.status(200).json("User: " + editedUser.name + " has been edited.");
            })
        })
    });
}