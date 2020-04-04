let User = require('../../models/user');
let auth = require('../../utils/auth');

module.exports = function (router) {
    router.route('/users/me/:id').put(auth.required, function (req, res) {

        User.findById({ _id: req.params.id }, function (err, user) {

            if (err) {
                return res.status(400).send(err);
            } 
            
            // if(req.body.profilePicture){
            //     user.profilePicture = req.body.profilePicture
            // }

            if(req.body.name){
                user.name = req.body.name
            }

            if(req.body.age){
                user.age = req.body.age
            }

            if(req.body.skateStance){
                user.skateStance = req.body.skateStance
            }

            if(req.body.styleOfSkating){
                user.styleOfSkating = req.body.styleOfSkating
            }
            if(req.body.reasonsForUsingTheApp){
                user.reasonsForUsingTheApp = req.body.reasonsForUsingTheApp
            }

            if(req.body.achievedTricks){
                user.achievedTricks = req.body.achievedTricks
            }
         
            // user.region = req.body.region   

            user.save(function (err, editedUser) {

                if (err) {
                    return res.status(400).send(err);
                }

                return res.status(200).json("User: " + editedUser.name + " has been edited.");
            })
        })
    });
}