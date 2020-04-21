let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');
let SkatePin = require('../../models/skatePin');

module.exports = function (router, upload) {
    router.route('/skateSpotImage/:id/upload').post(auth.required, upload.single("file"), function (req, res) {

        if (!hasPermission(req.tokenData, "image.upload", req, res)) return;

        let responseMessage;
        if (!req.file) {
            responseMessage = "no file"
        } else {
            responseMessage = "file"
        }

        if (res.statusCode == 200 && req.file) {

            SkatePin.findById({ _id: req.params.id }, function (err, pin) {

                if (err) {
                    return res.status(400).json({skateFinderrrorhererer: err});
                }

                pin.photo = req.file.filename;

                pin.save(function (err, editedPin) {

                    if (err) {
                        return res.status(400).json({pinsaveerrrorhererer: err});
                    }
                    return res.json({ file: req.file, message: responseMessage, editedPin:editedPin });                 
                })
            })

        } else {
            return res.json({ file: "failed", message: responseMessage });
        }
    });
}