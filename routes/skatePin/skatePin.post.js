let SkatePin = require('../../models/skatePin');
let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router) {
    router.route('/skatePin').post(auth.required, function (req, res) {

        if (!hasPermission(req.tokenData, "skatePin.post", req, res)) return;

        var skatePin = new SkatePin(req.body);   

        // if (!skatePin.title ||
        //     !skatePin.createdBy ||
        //     !skatePin.coordinate.latitude ||
        //     !skatePin.coordinate.longitude ||
        //     !skatePin.description ||
        //     !skatePin.startTime ||
        //     !skatePin.endTime ||
        //     !skatePin.pinColor) {
        //     return res.status(400).send('validation_error, pin credentials are required.');
        // }

        skatePin.save(function (err, newSkatePin) {

            if (err) {
                if (err.code == 11000) {
                    console.log(err);
                    return res.status(409).json('Duplication, save_failed');
                }
                return res.status(400).send(err);
            }

            return res.status(200).json("Skate Pin: " + newSkatePin.title + " has been created by " + newSkatePin.createdBy);
        })
    });
}