let SkatePin = require('../../models/skatePin');
let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router, upload) {
    router.route('/skatePin').post(auth.required, function (req, res) {

        if (!hasPermission(req.tokenData, "skatePin.post", req, res)) return;

        let skatePin = new SkatePin(req.body);

        skatePin.save(function (err, newSkatePin) {

            if (err) {
                if (err.code == 11000) {
                    console.log(err);
                    return res.status(409).json('Duplication, save_failed');
                }
                return res.status(400).send(err);
            }

            return res.status(200).json({newSkatePin: newSkatePin});
        })
    });
}