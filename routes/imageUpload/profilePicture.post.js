let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');
let User = require('../../models/user');

module.exports = function (router, upload) {
    router.route('/user/me/:id/upload').post(auth.required, upload.single("file"), function (req, res) {

        if (!hasPermission(req.tokenData, "image.upload", req, res)) return;

        let responseMessage;
        if (!req.file) {
            responseMessage = "no file"
        } else {
            responseMessage = "file"
        }

        if (res.statusCode == 200 && req.file) {

            User.findById({ _id: req.params.id }, function (err, user) {

                if (err) {
                    return res.status(400).send(err);
                }

                user.profilePicture = req.file.filename;

                user.save(function (err, editedUser) {

                    if (err) {
                        return res.status(400).send(err);
                    }
                    return res.json({ file: req.file, message: responseMessage, user:user });                 
                })
            })

        } else {
            return res.json({ file: "failed", message: responseMessage });
        }
    });
}