let SkatePin = require('../../models/skatePin');
let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router) {
    router.route('/skatePin/:id').delete(auth.required, function (req, res) {

        if (!hasPermission(req.tokenData, "skatePin.delete", req, res)) return;

        SkatePin.deleteOne({ _id: req.params.id }, function (err, result) {

            if (err || result.deletedCount == 0) {
                return res.status(400).json('Unable to delete SkatePin for id ' + req.params.id);
            }

            return res.status(200).json("SkatePin " + req.params.id + " has been deleted.");
        })
    });
}