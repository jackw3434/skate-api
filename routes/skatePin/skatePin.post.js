let SkatePin = require('../../models/skatePin');
let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router, upload) {
    router.route('/skatePin').post(auth.required, upload.single("file"), function (req, res) {

        if (!hasPermission(req.tokenData, "skatePin.post", req, res)) return;

        let skatePin = new SkatePin(req.body);

        let responseMessage;
        if (!req.file) {
            responseMessage = "no file"
        } else {
            responseMessage = "file"
            skatePin = req.file.filename;
        }

        skatePin.save(function (err, newSkatePin) {

            if (err) {
                if (err.code == 11000) {
                    console.log(err);
                    return res.status(409).json('Duplication, save_failed');
                }
                return res.status(400).send(err);
            }

            return res.status(200).json(
                "Skate Pin: " + newSkatePin.title +
                " has been created by " + newSkatePin.createdBy.userName +
                " photo: " + req.file +
                " message: " + responseMessage
            );
        })
    });
}