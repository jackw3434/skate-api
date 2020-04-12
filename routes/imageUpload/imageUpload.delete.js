let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router) {
    router.route('/upload').delete(auth.optional, function (req, res) {          

        console.log(req, res)

        // user.save(function (err, newUser) {

        //     if (err) {
        //         if (err.code == 11000) {
        //             console.log(err);
        //             return res.status(409).json('Duplication, save_failed, Unable to Save New User, Email: ' + user.email + ' already exists!');
        //         }
        //         return res.status(400).send(err);
        //     }

        //     return res.status(200).json("created.");
        // })
    });
}