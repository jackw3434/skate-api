let Users = require('../../models/user');
let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router) {
    router.route('/users').get(auth.required, function (req, res) {

        if (!hasPermission(req.tokenData, "users.get", req, res)) return;
  
        Users.find({}, function (err, users) {

            if (err) {
                return res.status(400).send('Generic_Error, getUsers_failed, Unable to Get Users');
            }

            return res.status(200).json({ users: users });
        })
    });
}